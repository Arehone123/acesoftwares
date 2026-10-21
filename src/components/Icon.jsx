import {
  Activity, AlertTriangle, ArrowLeft, ArrowRight, BarChart3, Bell, Bot, Braces, Briefcase, Building2,
  Calendar, Check, ChevronDown, CircleCheck, CircleX, ClipboardList, Clock, CloudUpload, Code, Cpu,
  Database, ExternalLink, Eye, Factory, FileCheck, FileSearch, FileText, Filter, Gauge, GitBranch,
  Globe, Hash, HeartHandshake, History, House, KeyRound, Landmark, Lock, Mail, Map, Megaphone, Menu,
  MessageCircle, MessageSquare, PenLine, Phone, Pickaxe, Play, Plus, Receipt, RefreshCw, Scale,
  ScanText, Search, Send, Server, Sheet, ShieldCheck, Sparkles, Split, Thermometer, Ticket, Truck,
  UserPlus, Users, Wallet, Webhook, Workflow, Wrench, X, Zap, HardHat,
} from 'lucide-react'

// One registry so data files can refer to icons by a short key.
const registry = {
  activity: Activity, alert: AlertTriangle, back: ArrowLeft, arrow: ArrowRight, chart: BarChart3,
  bell: Bell, bot: Bot, code: Braces, briefcase: Briefcase, building: Building2, calendar: Calendar,
  check: Check, chevron: ChevronDown, ok: CircleCheck, fail: CircleX, clipboard: ClipboardList,
  clock: Clock, upload: CloudUpload, js: Code, cpu: Cpu, db: Database, external: ExternalLink,
  eye: Eye, factory: Factory, filecheck: FileCheck, filesearch: FileSearch, file: FileText,
  filter: Filter, gauge: Gauge, branch: GitBranch, globe: Globe, hash: Hash, handshake: HeartHandshake,
  history: History, house: House, key: KeyRound, bank: Landmark, lock: Lock, mail: Mail, map: Map,
  megaphone: Megaphone, menu: Menu, whatsapp: MessageCircle, chat: MessageSquare, pen: PenLine,
  phone: Phone, pickaxe: Pickaxe, play: Play, plus: Plus, receipt: Receipt, refresh: RefreshCw,
  scale: Scale, ocr: ScanText, search: Search, send: Send, server: Server, sheet: Sheet,
  shield: ShieldCheck, sparkles: Sparkles, if: Split, temp: Thermometer, ticket: Ticket, truck: Truck,
  userplus: UserPlus, users: Users, wallet: Wallet, webhook: Webhook, workflow: Workflow,
  wrench: Wrench, x: X, zap: Zap, hardhat: HardHat,
}

export default function Icon({ name, size = 20, strokeWidth = 1.75, ...rest }) {
  const C = registry[name] || Sparkles
  return <C size={size} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />
}
