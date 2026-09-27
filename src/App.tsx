import React, { useState, useEffect, useCallback } from 'react';
import {
  ServerProperties,
  CartridgeConfig,
  PipelineStep,
  Operator,
  LogEntry,
  TelemetryData,
  MascotState,
} from './types';
import { ArcadeHeader } from './components/ArcadeHeader';
import { HeroConsoleBar } from './components/HeroConsoleBar';
import { CartridgeSlotCard } from './components/CartridgeSlotCard';
import { DeployPipelineCard } from './components/DeployPipelineCard';
import { ServerPropertiesCard } from './components/ServerPropertiesCard';
import { PlayerRosterCard } from './components/PlayerRosterCard';
import { CrtTerminalCard } from './components/CrtTerminalCard';
import { TelemetryScoreCard } from './components/TelemetryScoreCard';
import { EnlistOpModal } from './components/EnlistOpModal';
import { CartridgeArtworkModal } from './components/CartridgeArtworkModal';
import { MobileBottomBar } from './components/MobileBottomBar';
import {
  isSoundEnabled,
  setSoundEnabled,
  playButtonClick,
  playCoinSound,
  playDeployFanfare,
  playErrorBuzzer,
  playPurgeSound,
} from './utils/soundEffects';

const CARTRIDGES_DATA: CartridgeConfig[] = [
  {
    id: 'nether-bastion',
    expansionName: 'NETHER SMP EXPANSION',
    romSize: 'ROM 64MB',
    title: 'NETHER BASTION SMP',
    subtitle: 'OFFICIAL BDS ENGINE',
    icons: '⚔️ 👾 🔥',
    ratedTps: '20 TPS',
    version: '1.20.73.01',
    boxartStyle: 'nether',
  },
  {
    id: 'end-fortress',
    expansionName: 'VOID REALM PACK',
    romSize: 'ROM 128MB',
    title: 'END CITY RAIDERS',
    subtitle: 'SHULKER SURVIVAL',
    icons: '⚔️ 👁️ 🔮',
    ratedTps: '20 TPS',
    version: '1.20.73.01',
    boxartStyle: 'end',
  },
  {
    id: 'deep-dark',
    expansionName: 'SCULK LABS EXTENSION',
    romSize: 'ROM 64MB',
    title: 'WARDEN ANCIENT CITY',
    subtitle: 'STEALTH HARVEST',
    icons: '⚔️ 🛡️ 💎',
    ratedTps: '19.9 TPS',
    version: '1.20.80.22',
    boxartStyle: 'nether',
  },
  {
    id: 'overworld-mega',
    expansionName: 'CLASSIC VANILLA SMP',
    romSize: 'ROM 32MB',
    title: 'OVERWORLD KINGDOM',
    subtitle: 'BEDROCK SURVIVAL',
    icons: '🌲 ⛏️ 🏰',
    ratedTps: '20 TPS',
    version: '1.20.60.24',
    boxartStyle: 'overworld',
  },
];

const INITIAL_STEPS: PipelineStep[] = [
  { id: 1, name: '1. STOP CONTAINER PROCESS', time: '0.4s', status: 'pass' },
  { id: 2, name: '2. WIPE TEMPORARY RUNTIME', time: '1.1s', status: 'pass' },
  { id: 3, name: '3. DOWNLOAD BEDROCK BDS ZIP', time: '3.8s', status: 'pass' },
  { id: 4, name: '4. EXTRACT COMPONENT ASSETS', time: 'PROCESSING...', status: 'active' },
  { id: 5, name: '5. WRITE SERVER.PROPERTIES', time: 'PENDING', status: 'wait' },
];

const INITIAL_OPERATORS: Operator[] = [
  {
    id: 'op-1',
    playerSlot: '1P',
    slotBg: '#FFE600',
    gamertag: 'AlexCraft',
    xuid: '2535418902837419',
    role: 'OP LVL 4',
    roleBg: '#22C55E',
  },
  {
    id: 'op-2',
    playerSlot: '2P',
    slotBg: '#00F0FF',
    gamertag: 'SteveVoid',
    xuid: '2535467192804112',
    role: 'MODERATOR',
    roleBg: '#00F0FF',
  },
  {
    id: 'op-corrupt',
    gamertag: 'UNKNOWN',
    xuid: '2535499201948571',
    role: 'CORRUPT',
    isCorrupt: true,
  },
];

function getFormattedTime(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export default function App() {
  // View mode switcher: 'auto' (responsive), 'desktop' (cabinet), 'mobile' (handheld)
  const [viewMode, setViewMode] = useState<'auto' | 'desktop' | 'mobile'>('auto');
  const [soundMuted, setSoundMuted] = useState(!isSoundEnabled());

  // Server state
  const [daemonOnline, setDaemonOnline] = useState(true);
  const [credits, setCredits] = useState(4);
  const [selectedCartridge, setSelectedCartridge] = useState<CartridgeConfig>(CARTRIDGES_DATA[0]);
  const [selectedVersion, setSelectedVersion] = useState('1.20.73.01');
  const [isFlashing, setIsFlashing] = useState(false);

  // Pipeline state
  const [mascotState, setMascotState] = useState<MascotState>('active');
  const [progressPercent, setProgressPercent] = useState(66);
  const [steps, setSteps] = useState<PipelineStep[]>(INITIAL_STEPS);

  // Server.properties configuration
  const [serverConfig, setServerConfig] = useState<ServerProperties>({
    serverName: 'Nebula Nether Bastion [SMP]',
    levelName: 'world_nether_s1',
    gamemode: 'survival',
    difficulty: 'normal',
    maxPlayers: 20,
    port: 19132,
    v6Port: 19133,
    worldSeed: '-7482910482918392',
    viewDistance: 16,
    simulationDistance: 6,
    cheatsEnabled: false,
  });

  // Operators
  const [operators, setOperators] = useState<Operator[]>(INITIAL_OPERATORS);

  // CRT Terminal Logs
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', time: '04:12:10', tag: 'INFO', message: 'BDS Engine v1.20.73 initialized' },
    { id: '2', time: '04:12:11', tag: 'INFO', message: 'Port 19132 UDP online. Ready!' },
    { id: '3', time: '04:12:12', tag: 'CONF', message: 'Level: world_nether_s1 loaded.' },
    { id: '4', time: '04:12:13', tag: 'PASS', message: 'Whitelist: 14 players cached.' },
    { id: '5', time: '04:12:14', tag: 'WARN', message: 'Tick spike: 28ms buffer alloc' },
    { id: '6', time: '04:12:15', tag: 'INFO', message: 'SteveVoid connected (2P joined)' },
    { id: '7', time: '04:12:16', tag: 'PASS', message: 'Engine live @ play.nebulacraft.net' },
  ]);

  // Telemetry telemetry
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    tps: 20.0,
    ramUsageGb: 1.8,
    cpuPercent: 14,
    packetLoss: '0.00%',
    activeChunks: 1420,
    freeStorageGb: 24.2,
    rank: 'RANK S',
  });

  // Modals
  const [isEnlistOpen, setIsEnlistOpen] = useState(false);
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  const toggleSound = () => {
    const nextVal = !soundMuted;
    setSoundMuted(nextVal);
    setSoundEnabled(!nextVal);
  };

  const addLog = useCallback(
    (tag: 'INFO' | 'PASS' | 'WARN' | 'CONF' | 'CMD' | 'K.O.', message: string) => {
      setLogs((prev) => [
        ...prev.slice(-120), // keep last 120 lines
        {
          id: `${Date.now()}-${Math.random()}`,
          time: getFormattedTime(),
          tag,
          message,
        },
      ]);
    },
    []
  );

  // Trigger Flash / Deploy Pipeline
  const handleTriggerDeploy = () => {
    setIsFlashing(true);
    setMascotState('active');
    setProgressPercent(15);
    addLog('WARN', 'Arcade operator triggered BDS ROM re-flash!');

    // Simulated progressive pipeline steps
    setTimeout(() => {
      setProgressPercent(40);
      addLog('CONF', 'Decompressing Bedrock Dedicated Server assets...');
    }, 800);

    setTimeout(() => {
      setProgressPercent(75);
      addLog('PASS', `Flashing world: ${serverConfig.levelName} to Cartridge RAM.`);
    }, 1600);

    setTimeout(() => {
      setProgressPercent(100);
      setIsFlashing(false);
      addLog('PASS', 'Cartridge ROM boot sequence complete. 20.0 TPS locked!');
      playDeployFanfare();
    }, 2400);
  };

  // Toggle Daemon
  const handleToggleDaemon = () => {
    const nextState = !daemonOnline;
    setDaemonOnline(nextState);
    if (nextState) {
      addLog('PASS', 'Daemon process resumed. Bedrock service port 19132 listening.');
      setTelemetry((prev) => ({ ...prev, tps: 20.0, cpuPercent: 14 }));
    } else {
      addLog('WARN', 'Daemon stopped by operator. Server offline.');
      setTelemetry((prev) => ({ ...prev, tps: 0.0, cpuPercent: 1 }));
    }
  };

  // Insert Coin
  const handleInsertCoin = () => {
    setCredits((prev) => prev + 1);
    addLog('PASS', `🪙 COIN INSERTED! Total continues: ${credits + 1}`);
  };

  // Clear Logs
  const handleClearLogs = () => {
    setLogs([
      {
        id: `${Date.now()}`,
        time: getFormattedTime(),
        tag: 'CONF',
        message: '[CRT RESET] BUFFER CLEARED. READY.',
      },
    ]);
  };

  // Execute Command
  const handleExecuteCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    addLog('CMD', cmd);

    const parts = cmd.split(' ');
    const root = parts[0].toLowerCase();

    setTimeout(() => {
      if (root === '/help') {
        addLog(
          'INFO',
          'Commands: /op <name>, /deop <name>, /kick <name>, /say <msg>, /time set <day|night>, /gamemode <mode>, /tps, /stop, /start'
        );
      } else if (root === '/say') {
        const msg = parts.slice(1).join(' ') || 'Hello world!';
        addLog('CONF', `[Server] ${msg}`);
      } else if (root === '/op' && parts[1]) {
        const target = parts[1];
        const newXuid = '2535' + Math.floor(100000000000 + Math.random() * 900000000000).toString();
        const newOp: Operator = {
          id: `op-${Date.now()}`,
          playerSlot: `${operators.length + 1}P`,
          slotBg: '#FFE600',
          gamertag: target,
          xuid: newXuid,
          role: 'OP LVL 4',
          roleBg: '#22C55E',
        };
        setOperators((prev) => [...prev, newOp]);
        addLog('PASS', `Enlisted operator: ${target} (${newXuid})`);
      } else if (root === '/kick' && parts[1]) {
        const target = parts[1];
        setOperators((prev) => prev.filter((o) => o.gamertag.toLowerCase() !== target.toLowerCase()));
        addLog('WARN', `Player ${target} has been kicked from the server.`);
      } else if (root === '/gamemode' && parts[1]) {
        const gm = parts[1].toLowerCase() as 'survival' | 'creative' | 'adventure';
        if (['survival', 'creative', 'adventure'].includes(gm)) {
          setServerConfig((prev) => ({ ...prev, gamemode: gm }));
          addLog('CONF', `Game mode set to ${gm.toUpperCase()}`);
        } else {
          addLog('WARN', 'Unknown gamemode. Use survival, creative, or adventure.');
        }
      } else if (root === '/time' && parts[2]) {
        addLog('CONF', `Time set to ${parts[2]}`);
      } else if (root === '/stop') {
        setDaemonOnline(false);
        addLog('WARN', 'Server daemon halted via command.');
      } else if (root === '/start') {
        setDaemonOnline(true);
        addLog('PASS', 'Server daemon initialized via command.');
      } else if (root === '/tps') {
        addLog('INFO', `Current BDS TPS: ${telemetry.tps.toFixed(2)} (Tick stability: 100%)`);
      } else {
        addLog('PASS', `Executed native BDS instruction: ${cmd}`);
      }
    }, 200);
  };

  // Add operator from modal
  const handleAddOperator = (xuid: string, gamertag: string, role: string) => {
    const slotNumber = `${operators.length + 1}P`;
    const slotColors = ['#FFE600', '#00F0FF', '#FF4D8D', '#A855F7'];
    const chosenColor = slotColors[operators.length % slotColors.length];

    const newOp: Operator = {
      id: `op-${Date.now()}`,
      playerSlot: slotNumber,
      slotBg: chosenColor,
      gamertag,
      xuid,
      role,
      roleBg: role.includes('OP') ? '#22C55E' : role.includes('MOD') ? '#00F0FF' : '#A855F7',
    };

    setOperators((prev) => [...prev, newOp]);
    addLog('PASS', `Enlisted operator: ${gamertag} (${xuid})`);
  };

  // Kick operator
  const handleKickOperator = (id: string, name: string) => {
    setOperators((prev) => prev.filter((o) => o.id !== id));
    addLog('WARN', `Revoked & kicked operator: ${name}`);
  };

  // Purge corrupt record
  const handlePurgeRecord = (id: string) => {
    setOperators((prev) => prev.filter((o) => o.id !== id));
    addLog('PASS', 'Purged corrupted XUID entry from cassette whitelist table.');
  };

  // Periodic random background telemetry flux (feels alive!)
  useEffect(() => {
    if (!daemonOnline) return;

    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const flux = (Math.random() - 0.5) * 0.1;
        const newTps = Math.min(20.0, Math.max(19.7, 20.0 + flux));
        const cpuFlux = Math.floor(12 + Math.random() * 6);
        return {
          ...prev,
          tps: newTps,
          cpuPercent: cpuFlux,
          activeChunks: 1420 + Math.floor(Math.random() * 15),
        };
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [daemonOnline]);

  const endpointUrl = `play.nebulacraft.net:${serverConfig.port}`;

  return (
    <div className="text-black selection:bg-[#FFE600] selection:text-black min-h-screen">
      {/* ==================== TOP MARQUEE TICKER ==================== */}
      <ArcadeHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        soundMuted={soundMuted}
        toggleSound={toggleSound}
        daemonOnline={daemonOnline}
        port={serverConfig.port}
        levelName={serverConfig.levelName}
        tps={telemetry.tps}
      />

      {/* ==================== DESKTOP SIMULATOR VIEW (3-COLUMN ARCADE DASHBOARD) ==================== */}
      {(viewMode === 'desktop' || viewMode === 'auto') && (
        <div
          className={`${
            viewMode === 'auto' ? 'hidden md:block' : 'block'
          } max-w-[1540px] mx-auto px-4 md:px-6 pt-6 pb-14`}
        >
          {/* HERO CONSOLE HOOD */}
          <HeroConsoleBar
            endpoint={endpointUrl}
            daemonOnline={daemonOnline}
            onToggleDaemon={handleToggleDaemon}
            onOpenSettings={() => setIsVaultOpen(true)}
          />

          {/* MAIN 3-COLUMN INTERACTIVE GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT COLUMN: CARTRIDGE & PIPELINE (4 COLS) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <CartridgeSlotCard
                cartridge={selectedCartridge}
                selectedVersion={selectedVersion}
                onSelectVersion={(v) => {
                  setSelectedVersion(v);
                  addLog('CONF', `BDS ROM binary switched to ${v}`);
                }}
                isFlashing={isFlashing}
                onTriggerDeploy={handleTriggerDeploy}
                onOpenCartridgeSelect={() => setIsVaultOpen(true)}
              />

              <DeployPipelineCard
                progressPercent={progressPercent}
                mascotState={mascotState}
                onSetMascotState={(state) => {
                  setMascotState(state);
                  if (state === 'idle') {
                    addLog('INFO', 'Mascot switched to 1P IDLE mode.');
                  } else if (state === 'active') {
                    addLog('PASS', 'Mascot switched to 2P COMBO running mode.');
                  } else {
                    addLog('K.O.', 'Mascot triggered K.O. FAIL test state!');
                  }
                }}
                steps={steps}
              />
            </div>

            {/* CENTER COLUMN: SERVER.PROPERTIES & OPS (5 COLS) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <ServerPropertiesCard
                config={serverConfig}
                onChangeConfig={(partial) => {
                  setServerConfig((prev) => ({ ...prev, ...partial }));
                }}
                onLogMessage={(tag, msg) => addLog(tag, msg)}
              />

              <PlayerRosterCard
                operators={operators}
                onOpenEnlistModal={() => setIsEnlistOpen(true)}
                onKickOperator={handleKickOperator}
                onPurgeRecord={handlePurgeRecord}
              />
            </div>

            {/* RIGHT COLUMN: CRT TERMINAL & TELEMETRY (3 COLS) */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              <CrtTerminalCard
                logs={logs}
                telemetry={telemetry}
                credits={credits}
                onInsertCoin={handleInsertCoin}
                onClearLogs={handleClearLogs}
                onExecuteCommand={handleExecuteCommand}
              />

              <TelemetryScoreCard telemetry={telemetry} />
            </div>
          </div>
        </div>
      )}

      {/* ==================== MOBILE HANDHELD CONSOLE VIEW ==================== */}
      {(viewMode === 'mobile' || viewMode === 'auto') && (
        <div
          className={`${
            viewMode === 'auto' ? 'block md:hidden' : 'block'
          } max-w-[440px] mx-auto px-3.5 pt-3.5 pb-36 space-y-4`}
        >
          {/* Mobile Hero Bar */}
          <HeroConsoleBar
            endpoint={endpointUrl}
            daemonOnline={daemonOnline}
            onToggleDaemon={handleToggleDaemon}
            onOpenSettings={() => setIsVaultOpen(true)}
          />

          {/* Module 1: Cartridge Slot */}
          <CartridgeSlotCard
            cartridge={selectedCartridge}
            selectedVersion={selectedVersion}
            onSelectVersion={(v) => {
              setSelectedVersion(v);
              addLog('CONF', `BDS ROM binary switched to ${v}`);
            }}
            isFlashing={isFlashing}
            onTriggerDeploy={handleTriggerDeploy}
            onOpenCartridgeSelect={() => setIsVaultOpen(true)}
          />

          {/* Module 2: Deploy Pipeline (Collapsible on mobile) */}
          <DeployPipelineCard
            progressPercent={progressPercent}
            mascotState={mascotState}
            onSetMascotState={(state) => {
              setMascotState(state);
              if (state === 'idle') {
                addLog('INFO', 'Mascot switched to 1P IDLE mode.');
              } else if (state === 'active') {
                addLog('PASS', 'Mascot switched to 2P COMBO running mode.');
              } else {
                addLog('K.O.', 'Mascot triggered K.O. FAIL test state!');
              }
            }}
            steps={steps}
            collapsible={true}
          />

          {/* Module 3: Server.properties */}
          <ServerPropertiesCard
            config={serverConfig}
            onChangeConfig={(partial) => {
              setServerConfig((prev) => ({ ...prev, ...partial }));
            }}
            onLogMessage={(tag, msg) => addLog(tag, msg)}
          />

          {/* Module 4: Player Roster */}
          <PlayerRosterCard
            operators={operators}
            onOpenEnlistModal={() => setIsEnlistOpen(true)}
            onKickOperator={handleKickOperator}
            onPurgeRecord={handlePurgeRecord}
          />

          {/* Module 5: CRT Terminal & Telemetry */}
          <CrtTerminalCard
            logs={logs}
            telemetry={telemetry}
            credits={credits}
            onInsertCoin={handleInsertCoin}
            onClearLogs={handleClearLogs}
            onExecuteCommand={handleExecuteCommand}
            compactHeight={true}
          />

          <TelemetryScoreCard telemetry={telemetry} />

          {/* Persistent Bottom Floating Action Bar */}
          <MobileBottomBar
            isFlashing={isFlashing}
            onTriggerDeploy={handleTriggerDeploy}
          />
        </div>
      )}

      {/* ==================== ENLIST OPERATOR MODAL ==================== */}
      <EnlistOpModal
        isOpen={isEnlistOpen}
        onClose={() => setIsEnlistOpen(false)}
        onAddOperator={handleAddOperator}
      />

      {/* ==================== CARTRIDGE ARTWORK & SWITCH VAULT MODAL ==================== */}
      <CartridgeArtworkModal
        isOpen={isVaultOpen}
        onClose={() => setIsVaultOpen(false)}
        cartridges={CARTRIDGES_DATA}
        currentCartridgeId={selectedCartridge.id}
        onSelectCartridge={(cart) => {
          setSelectedCartridge(cart);
          setSelectedVersion(cart.version);
          addLog('CONF', `Swapped cartridge ROM to: ${cart.title} [${cart.expansionName}]`);
        }}
      />
    </div>
  );
}
