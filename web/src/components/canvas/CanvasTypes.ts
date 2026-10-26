/**
 * CanvasTypes.ts — 画布协作前端通用辅助函数与视觉配置。
 *
 * 对标 LangGraph / n8n / Dify / Coze 的前沿工作流范式：
 * 触发 → 规划 → 执行(Agent群) → 工具/知识 → 条件/循环 → 人工审批 → 汇聚 → 评估 → 结束。
 */
import type { CanvasEngineId, CanvasNodeRole, CanvasNodeStatus } from "../../types";

export interface EngineMeta {
	id: CanvasEngineId;
	name: string;
	badge: string;
	color: string;
	bgColor: string;
	desc: string;
}

export const ENGINE_METAS: Record<CanvasEngineId, EngineMeta> = {
	pi: {
		id: "pi",
		name: "Pi Native",
		badge: "PI",
		color: "var(--accent, #a855f7)",
		bgColor: "color-mix(in srgb, var(--accent, #a855f7) 15%, transparent)",
		desc: "Full plugin ecosystem, lazy tool loading and global subagent orchestration",
	},
	dsh: {
		id: "dsh",
		name: "DSH Turbo",
		badge: "DSH",
		color: "var(--info-blue, #38bdf8)",
		bgColor: "color-mix(in srgb, var(--info-blue, #38bdf8) 15%, transparent)",
		desc: "Hashline patch engine; excels at rapid, high-frequency refactors and patching",
	},
	claude: {
		id: "claude",
		name: "Claude Code",
		badge: "CLAUDE",
		color: "var(--amber, #f97316)",
		bgColor: "color-mix(in srgb, var(--amber, #f97316) 15%, transparent)",
		desc: "Official Anthropic runtime; strong at cross-module logic and hard debugging",
	},
	durable: {
		id: "durable",
		name: "Durable Self-Healing",
		badge: "DURABLE",
		color: "var(--green, #22c55e)",
		bgColor: "color-mix(in srgb, var(--green, #22c55e) 15%, transparent)",
		desc: "Transactional long-task engine for end-to-end test automation and self-healing",
	},
};

interface RoleMeta {
	role: CanvasNodeRole;
	labelZh: string;
	labelEn: string;
	icon: string;
	/** 节点分组：trigger=触发输入 agent=智能体 logic=逻辑控制 data=工具数据 output=收尾输出 */
	group: "trigger" | "agent" | "logic" | "data" | "output";
	blurb: string;
	defaultInstruction: string;
	needsLlm: boolean;
}

export const ROLE_METAS: Record<CanvasNodeRole, RoleMeta> = {
	trigger: {
		role: "trigger",
		labelZh: "Task Input (Trigger)",
		labelEn: "Task Input / Trigger",
		icon: "📋",
		group: "trigger",
		blurb: "Pipeline entry: fill in the requirement or kickoff input to start the flow",
		defaultInstruction: "",
		needsLlm: false,
	},
	cron: {
		role: "cron",
		labelZh: "Schedule (Cron)",
		labelEn: "Schedule / Cron",
		icon: "⏰",
		group: "trigger",
		blurb: "Starts on a Cron expression (external scheduler)",
		defaultInstruction: "",
		needsLlm: false,
	},
	webhook: {
		role: "webhook",
		labelZh: "Webhook Trigger",
		labelEn: "Webhook Trigger",
		icon: "🪝",
		group: "trigger",
		blurb: "Started by an external system callback (reserved endpoint)",
		defaultInstruction: "",
		needsLlm: false,
	},
	transform: {
		role: "transform",
		labelZh: "Transform (Map)",
		labelEn: "Transform / Map",
		icon: "🔄",
		group: "data",
		blurb: "Text↔JSON / template rendering, deterministic local execution",
		defaultInstruction: "",
		needsLlm: false,
	},
	architect: {
		role: "architect",
		labelZh: "Lead Architect",
		labelEn: "Lead Architect",
		icon: "🏛️",
		group: "agent",
		blurb: "Requirement breakdown, tech selection and task dispatch",
		defaultInstruction: "Break the business requirement into clear frontend/backend technical specs and data contracts, then dispatch to downstream engineers.",
		needsLlm: true,
	},
	planner: {
		role: "planner",
		labelZh: "Planner",
		labelEn: "Task Planner",
		icon: "🗺️",
		group: "agent",
		blurb: "Chain-of-thought decomposition into an executable step list",
		defaultInstruction: "Break the goal into 3-7 executable steps with clear inputs, outputs and acceptance criteria; hand the task list downstream.",
		needsLlm: true,
	},
	coder: {
		role: "coder",
		labelZh: "Coder",
		labelEn: "Software Engineer",
		icon: "💻",
		group: "agent",
		blurb: "Coding, refactoring and feature implementation",
		defaultInstruction: "Write high-quality code per the upstream contract; keep changes minimal and runnable.",
		needsLlm: true,
	},
	researcher: {
		role: "researcher",
		labelZh: "Researcher",
		labelEn: "Researcher",
		icon: "🌐",
		group: "agent",
		blurb: "Web search + doc reading + competitor analysis",
		defaultInstruction: "Research the task online and produce a structured report (state of the art / option comparison / recommendation) for downstream.",
		needsLlm: true,
	},
	writer: {
		role: "writer",
		labelZh: "Writer",
		labelEn: "Writer",
		icon: "✍️",
		group: "agent",
		blurb: "Requirement docs / README / changelogs",
		defaultInstruction: "Turn upstream deliverables into clear docs: background, changes, usage, caveats.",
		needsLlm: true,
	},
	analyst: {
		role: "analyst",
		labelZh: "Analyst",
		labelEn: "Data Analyst",
		icon: "📊",
		group: "agent",
		blurb: "Log / data / performance analysis and insights",
		defaultInstruction: "Analyze the input data and logs; produce quantified findings and actionable optimizations.",
		needsLlm: true,
	},
	reviewer: {
		role: "reviewer",
		labelZh: "Reviewer",
		labelEn: "Code Reviewer",
		icon: "🔍",
		group: "agent",
		blurb: "Quality gate: review, score and suggest fixes",
		defaultInstruction: "Review upstream code for correctness, edge cases, security and style; conclude pass/reject with a fix list.",
		needsLlm: true,
	},
	tester: {
		role: "tester",
		labelZh: "Test & Ops (DevOps)",
		labelEn: "QA & DevOps",
		icon: "🧪",
		group: "agent",
		blurb: "Write and run tests with self-healing fixes",
		defaultInstruction: "Write and run tests; auto-fix failures until all pass.",
		needsLlm: true,
	},
	devops: {
		role: "devops",
		labelZh: "Release (Deploy)",
		labelEn: "Deploy & Release",
		icon: "🚀",
		group: "agent",
		blurb: "Build, deploy and release operations",
		defaultInstruction: "Own build verification and the release process; keep artifacts deployable and rollbackable.",
		needsLlm: true,
	},
	evaluator: {
		role: "evaluator",
		labelZh: "Quality Judge",
		labelEn: "LLM-as-Judge",
		icon: "⚖️",
		group: "output",
		blurb: "LLM-as-judge scoring; sub-par output takes the reject edge",
		defaultInstruction: "Act as quality judge: score correctness/completeness/conventions (0-100); below 80, explain the rejection.",
		needsLlm: true,
	},
	custom: {
		role: "custom",
		labelZh: "Custom Agent",
		labelEn: "Custom Teammate",
		icon: "🤖",
		group: "agent",
		blurb: "A fully custom AI teammate",
		defaultInstruction: "",
		needsLlm: true,
	},
	// —— 逻辑控制（弱 LLM / 无需独立会话，直通或轻量判定）——
	condition: {
		role: "condition",
		labelZh: "Condition (If/Else)",
		labelEn: "Condition Branch",
		icon: "🔀",
		group: "logic",
		blurb: "Routes to the true / false edge by expression",
		defaultInstruction: "",
		needsLlm: false,
	},
	ai_judge: {
		role: "ai_judge",
		labelZh: "AI Judge",
		labelEn: "AI Judge",
		icon: "🧠",
		group: "logic",
		blurb: "Model semantic verdict routes pass / reject",
		defaultInstruction: "",
		needsLlm: true,
	},
	loop: {
		role: "loop",
		labelZh: "Loop (Retry)",
		labelEn: "Loop / Retry",
		icon: "🔁",
		group: "logic",
		blurb: "Re-run downstream up to N times (circuit breaker)",
		defaultInstruction: "",
		needsLlm: false,
	},
	human: {
		role: "human",
		labelZh: "Human Approval",
		labelEn: "Human-in-the-loop",
		icon: "🧑‍⚖️",
		group: "logic",
		blurb: "Pauses for human approve/reject (review gate)",
		defaultInstruction: "",
		needsLlm: false,
	},
	merge: {
		role: "merge",
		labelZh: "Join (Merge)",
		labelEn: "Merge / Join",
		icon: "🔗",
		group: "logic",
		blurb: "Parallel branches converge here before continuing",
		defaultInstruction: "",
		needsLlm: false,
	},
	subflow: {
		role: "subflow",
		labelZh: "Subflow",
		labelEn: "Sub-workflow",
		icon: "📦",
		group: "logic",
		blurb: "References another canvas graph as a sub-pipeline",
		defaultInstruction: "Summarize upstream artifacts into the subflow input.",
		needsLlm: true,
	},
	// —— 工具与数据 ——
	tool: {
		role: "tool",
		labelZh: "Tool Call",
		labelEn: "Tool Call",
		icon: "🛠️",
		group: "data",
		blurb: "Atomic tools: bash / files / search...",
		defaultInstruction: "Follow tool-call discipline: state the purpose, execute, then summarize results downstream.",
		needsLlm: true,
	},
	knowledge: {
		role: "knowledge",
		labelZh: "Knowledge (RAG)",
		labelEn: "Knowledge Retrieval",
		icon: "📚",
		group: "data",
		blurb: "Retrieval-augmented answers from local knowledge/docs",
		defaultInstruction: "Answer from the knowledge base: list retrieved evidence first, then synthesize with citations.",
		needsLlm: true,
	},
	code: {
		role: "code",
		labelZh: "Code Exec",
		labelEn: "Code Execution",
		icon: "🧩",
		group: "data",
		blurb: "Runs a script for data processing/validation",
		defaultInstruction: "Write and run the scripts needed for data processing; hand a result summary downstream.",
		needsLlm: true,
	},
	api: {
		role: "api",
		labelZh: "API Call (HTTP)",
		labelEn: "HTTP Request",
		icon: "🌍",
		group: "data",
		blurb: "Calls external HTTP / webhook endpoints",
		defaultInstruction: "Call the configured external API; clean the response into a summary for downstream.",
		needsLlm: true,
	},
	memory: {
		role: "memory",
		labelZh: "Memory",
		labelEn: "Memory Read/Write",
		icon: "🧠",
		group: "data",
		blurb: "Cross-node shared variables / long-term memory",
		defaultInstruction: "",
		needsLlm: false,
	},
	end: {
		role: "end",
		labelZh: "End (Output)",
		labelEn: "End / Output",
		icon: "🏁",
		group: "output",
		blurb: "Aggregates all upstream artifacts into the final deliverable",
		defaultInstruction: "",
		needsLlm: false,
	},
};

interface NodeGroupMeta {
	id: RoleMeta["group"];
	labelZh: string;
	labelEn: string;
}

export const NODE_GROUPS: NodeGroupMeta[] = [
	{ id: "trigger", labelZh: "Trigger & Input", labelEn: "Trigger & Input" },
	{ id: "agent", labelZh: "AI Agents", labelEn: "AI Agents" },
	{ id: "logic", labelZh: "Logic Control", labelEn: "Logic Control" },
	{ id: "data", labelZh: "Tools & Data", labelEn: "Tools & Data" },
	{ id: "output", labelZh: "Evaluate & Finish", labelEn: "Evaluate & Finish" },
];

/** 纯透传控制节点：无需启动 LLM 会话，直接标记完成并向下游透传摘要 */
const PASSTHROUGH_ROLES: ReadonlySet<CanvasNodeRole> = new Set([
	"condition",
	"loop",
	"human",
	"merge",
	"memory",
	"end",
	"trigger",
	"cron",
	"webhook",
]);

export function isPassthroughRole(role: CanvasNodeRole): boolean {
	return PASSTHROUGH_ROLES.has(role);
}

/** 该角色是否展示「任务指令」输入框（LLM 型节点展示，纯控制节点展示配置项） */
export function roleNeedsInstruction(role: CanvasNodeRole): boolean {
	return ROLE_METAS[role]?.needsLlm ?? true;
}

export const STATUS_COLORS: Record<CanvasNodeStatus, { text: string; bg: string; dot: string }> = {
	idle: { text: "var(--text-faint)", bg: "var(--bg-elev)", dot: "#94a3b8" },
	queued: { text: "var(--amber-text)", bg: "color-mix(in srgb, var(--amber) 12%, transparent)", dot: "var(--amber)" },
	running: {
		text: "var(--info-blue)",
		bg: "color-mix(in srgb, var(--info-blue) 12%, transparent)",
		dot: "var(--info-blue)",
	},
	waiting_approval: {
		text: "var(--amber-text)",
		bg: "color-mix(in srgb, var(--amber) 20%, transparent)",
		dot: "var(--amber)",
	},
	done: { text: "var(--green)", bg: "color-mix(in srgb, var(--green) 12%, transparent)", dot: "var(--green)" },
	error: { text: "var(--err-text)", bg: "color-mix(in srgb, var(--red) 12%, transparent)", dot: "var(--red)" },
	paused: { text: "var(--text-faint)", bg: "var(--bg-elev)", dot: "#647b8b" },
};

/** 字段级端子目录：端口不再是整卡一进一出，而是绑定卡片内具体数值。
 *  - 输入端（左侧）：contract=任务契约（主输入） instruction=AI指令 system=Role Spec config=控制参数
 *  - 输出端（右侧）：result=交付产物（主输出） true/false=条件分支 approve/reject=审批裁决
 *  位置由卡片 DOM 实测（offsetTop）上报，SvgEdges 按实测 Y 绘制，历史无端口边回退 PORT_Y_OFFSET。 */
interface CanvasPortDef {
	key: string;
	labelZh: string;
	desc: string;
}

export const IN_PORT_DEFS: CanvasPortDef[] = [
	{ key: "contract", labelZh: "Task Contract", desc: "Main input: upstream deliverable injected as the task contract" },
	{ key: "instruction", labelZh: "AI Instruction", desc: "Write this round's AI instruction (supports the {{upstream}} variable)" },
	{ key: "system", labelZh: "Role Spec", desc: "Enrich the base persona with upstream output" },
	{ key: "config", labelZh: "Control Params", desc: "Feed condition expressions / loop counts etc. as control context" },
];

const OUT_PORT_DEFS_BASE: CanvasPortDef[] = [{ key: "result", labelZh: "Deliverable", desc: "Main output: this node's deliverable summary" }];

/** 按角色追加分支输出端子（条件 / 人工 / 评估 / 审查）。 */
export function outPortsForRole(role: CanvasNodeRole): CanvasPortDef[] {
	const extra: CanvasPortDef[] = [];
	if (role === "condition" || role === "ai_judge") {
		extra.push(
			{ key: "true", labelZh: "True", desc: "Condition holds — takes this edge (condition_true)" },
			{ key: "false", labelZh: "False", desc: "Condition fails — takes this edge (condition_false)" },
		);
	}
	if (role === "human") {
		extra.push({ key: "approve", labelZh: "Approve", desc: "After human approval (approve)" });
	}
	if (role === "evaluator" || role === "reviewer") {
		extra.push(
			{ key: "approve", labelZh: "Pass", desc: "Evaluation passed (approve)" },
			{ key: "reject", labelZh: "Reject", desc: "Evaluation rejected (reject / loop_back)" },
		);
	}
	return [...OUT_PORT_DEFS_BASE, ...extra];
}

export function inPortLabel(key: string | undefined): string {
	if (!key || key === "contract") return "Task Contract";
	return IN_PORT_DEFS.find((d) => d.key === key)?.labelZh ?? key;
}

export function outPortLabel(key: string | undefined): string {
	if (!key || key === "result") return "Deliverable";
	const all: CanvasPortDef[] = [
		...OUT_PORT_DEFS_BASE,
		{ key: "true", labelZh: "True", desc: "" },
		{ key: "false", labelZh: "False", desc: "" },
		{ key: "approve", labelZh: "Approve/Pass", desc: "" },
		{ key: "reject", labelZh: "Reject", desc: "" },
	];
	return all.find((d) => d.key === key)?.labelZh ?? key;
}

/** 按角色分型的专属参数表：每个角色只露自己的配置，不再所有节点一个样。
 *  - 卡片：Agent 类渲染为「Role Params」组；纯代码类渲染为 utility 专属区（含 config 端子）
 *  - 抽屉：控制参数区同表驱动，保持两端一致
 *  - 调度器：Agent 节点的非空配置会拼入提示词「本节点专属参数」，所见即所得 */
type RoleFieldKind = "text" | "textarea" | "number" | "select" | "hint" | "boolean";

export interface RoleField {
	key: string;
	labelZh: string;
	kind: RoleFieldKind;
	placeholder?: string;
	options?: { value: string; labelZh: string }[];
	min?: number;
	max?: number;
	default?: string | number | boolean;
	rows?: number;
	hint?: string;
	showIf?: { key: string; value: string | number | boolean };
}

export const ROLE_FIELDS: Record<CanvasNodeRole, RoleField[]> = {
	trigger: [
		{
			key: "payload",
			labelZh: "Requirement / Task Input",
			kind: "textarea",
			rows: 4,
			placeholder: "Describe the feature, change goal or business context (e.g., implement a dark-mode toggle and remember the preference)…",
		},
	],
	cron: [
		{
			key: "cron",
			labelZh: "Cron Expression",
			kind: "text",
			default: "*/30 * * * *",
			placeholder: "*/30 * * * * (min hour day month weekday)",
			hint: "Triggered by an external scheduler; passes through downstream when fired.",
		},
	],
	webhook: [
		{ key: "path", labelZh: "Callback Path", kind: "text", default: "/hook/demo", placeholder: "/hook/order-created" },
		{
			key: "method",
			labelZh: "Method",
			kind: "select",
			default: "POST",
			options: [
				{ value: "GET", labelZh: "GET" },
				{ value: "POST", labelZh: "POST" },
			],
			hint: "External systems start the flow via this endpoint (reserved; manual trigger in this version).",
		},
	],
	transform: [
		{
			key: "mode",
			labelZh: "Transform Mode (local)",
			kind: "select",
			default: "text2json",
			options: [
				{ value: "text2json", labelZh: "Text → JSON" },
				{ value: "json2text", labelZh: "JSON → Text" },
				{ value: "template", labelZh: "Template Render" },
			],
		},
		{
			key: "template",
			labelZh: "Render Template",
			kind: "textarea",
			rows: 3,
			default: "{{input}}",
			placeholder: "Template; {{input}} is replaced by the upstream deliverable",
			showIf: { key: "mode", value: "template" },
		},
	],
	architect: [],
	planner: [{ key: "maxSteps", labelZh: "Max Steps", kind: "number", min: 2, max: 12, default: 5 }],
	coder: [],
	researcher: [
		{
			key: "depth",
			labelZh: "Research Depth",
			kind: "select",
			default: "standard",
			options: [
				{ value: "quick", labelZh: "Quick (key points)" },
				{ value: "standard", labelZh: "Standard (multi-source)" },
				{ value: "deep", labelZh: "Deep (source tracing)" },
			],
		},
		{ key: "maxSources", labelZh: "Max Sources", kind: "number", min: 1, max: 20, default: 5 },
	],
	writer: [],
	analyst: [],
	reviewer: [
		{
			key: "strictness",
			labelZh: "Review Strictness",
			kind: "select",
			default: "standard",
			options: [
				{ value: "lenient", labelZh: "Lenient (blockers only)" },
				{ value: "standard", labelZh: "Standard (correctness + style)" },
				{ value: "strict", labelZh: "Strict (line-by-line nitpicks)" },
			],
		},
	],
	tester: [
		{
			key: "testCommand",
			labelZh: "Test Command",
			kind: "text",
			default: "npm test",
			placeholder: "npm test / pytest / go test …",
		},
	],
	devops: [
		{
			key: "environment",
			labelZh: "Release Env",
			kind: "select",
			default: "staging",
			options: [
				{ value: "staging", labelZh: "Staging" },
				{ value: "prod", labelZh: "Production" },
			],
		},
	],
	evaluator: [
		{
			key: "threshold",
			labelZh: "Pass Score",
			kind: "number",
			min: 0,
			max: 100,
			default: 80,
			hint: "Below this score, output takes the reject edge.",
		},
	],
	custom: [],
	condition: [
		{
			key: "condition",
			labelZh: "Condition Expression",
			kind: "text",
			default: "Upstream artifact contains reject/fail keywords",
			placeholder: "e.g., upstream artifact contains the keyword success",
		},
	],
	ai_judge: [
		{
			key: "judge",
			labelZh: "Verdict Question",
			kind: "textarea",
			rows: 2,
			placeholder: "e.g., does the regression summary prove the flake no longer reproduces?",
			hint: "Empty = read the AI instruction; if both are empty a default question is used. Without upstream the model answers directly; with upstream it answers based on it. The model only replies pass/fail.",
		},
	],
	loop: [
		{
			key: "loopCount",
			labelZh: "Max Loops",
			kind: "number",
			min: 1,
			max: 10,
			default: 3,
			hint: "Circuit breaker: pauses for a human when exceeded.",
		},
	],
	human: [
		{
			key: "approvalHint",
			labelZh: "Approval Hint",
			kind: "text",
			default: "Approve only if the deliverable meets the acceptance criteria",
			placeholder: "e.g., approve only if the deliverable meets the acceptance criteria",
		},
	],
	knowledge: [
		{ key: "topK", labelZh: "Retrieve TopK", kind: "number", min: 1, max: 20, default: 5 },
		{ key: "baseId", labelZh: "Knowledge Base ID", kind: "text", placeholder: "Defaults to workspace full-text search" },
	],
	tool: [{ key: "toolName", labelZh: "Tool Name", kind: "text", default: "bash", placeholder: "bash / read / search…" }],
	code: [
		{
			key: "language",
			labelZh: "Script Language",
			kind: "select",
			default: "TypeScript",
			options: [
				{ value: "TypeScript", labelZh: "TypeScript" },
				{ value: "Python", labelZh: "Python" },
				{ value: "Bash", labelZh: "Bash" },
			],
		},
		{ key: "entry", labelZh: "Entry/Notes", kind: "textarea", rows: 3, placeholder: "Describe the data processing to do, or the entry function…" },
	],
	api: [
		{ key: "apiUrl", labelZh: "API 地址", kind: "text", default: "https://", placeholder: "https://" },
		{
			key: "apiMethod",
			labelZh: "Method",
			kind: "select",
			default: "POST",
			options: [
				{ value: "GET", labelZh: "GET" },
				{ value: "POST", labelZh: "POST" },
				{ value: "PUT", labelZh: "PUT" },
				{ value: "DELETE", labelZh: "DELETE" },
			],
		},
	],
	merge: [],
	memory: [
		{ key: "memoryKey", labelZh: "Memory Key", kind: "text", default: "shared_memory", placeholder: "shared_memory" },
	],
	end: [],
	subflow: [{ key: "subflowId", labelZh: "Subflow ID", kind: "text", placeholder: "Target canvas project id" }],
};

/** 每个角色的输入输出速查（卡片 ? 提示用）：输入要什么 / 输出给什么 / 一句话用法 */
interface RoleIoHelp {
	input: string;
	output: string;
	usage: string;
}

export const ROLE_IO_HELP: Record<CanvasNodeRole, RoleIoHelp> = {
	trigger: {
		input: "No upstream; the launch dialog input is merged automatically",
		output: "Full launch payload, passed through as-is",
		usage: "Write the task in the payload, then hit run; downstream references it via {{upstream}}",
	},
	cron: {
		input: "No upstream; fires on schedule",
		output: "Cron config + empty payload pass-through",
		usage: "Scheduled pipeline entry; followed by execution nodes",
	},
	webhook: { input: "External HTTP callback", output: "Callback body passed through as-is", usage: "Reserved for external triggers; manual trigger in this version" },
	transform: {
		input: "Upstream artifact text",
		output: "Converted per mode: text↔JSON / template render result",
		usage: "Clean formats before agents work; use {{input}} as the template placeholder",
	},
	architect: {
		input: "Requirement description / upstream summary",
		output: "Technical spec + decomposed task list",
		usage: "Put first as the lead; follow with planner / coder",
	},
	planner: {
		input: "Goal / requirement summary",
		output: "3-7 step executable list (with acceptance criteria)",
		usage: "Break big tasks down first, then fan out to multiple coders",
	},
	coder: {
		input: "Task contract + AI instruction (supports {{upstream}})",
		output: "Code change summary + git diff stats",
		usage: "Core worker node: state file scope and acceptance criteria in the instruction",
	},
	researcher: {
		input: "Research topic",
		output: "State of the art / option comparison / recommendation",
		usage: "Research before choosing tech; hand results to architect / coder",
	},
	writer: { input: "Upstream deliverable", output: "Document body (background/changes/usage)", usage: "Wrap-up README / changelog; connect to end" },
	analyst: { input: "Data / log text", output: "Quantified findings + actionable optimizations", usage: "Performance/failure analysis; results go back to the coder" },
	reviewer: {
		input: "Code summary to review",
		output: "Pass takes the approve edge; reject takes the reject edge + fix list",
		usage: "Quality gate after the coder; tune strictness in params",
	},
	tester: {
		input: "Code / requirement to test",
		output: "Test report: pass or fail + auto-fix",
		usage: "Configure the test command; failures get auto-fixed until green",
	},
	devops: { input: "Releasable artifact", output: "Build / release result", usage: "Build verification and release at the end of the pipeline" },
	evaluator: {
		input: "Artifact to score",
		output: "Score 0-100; below threshold takes the reject edge",
		usage: "Acts as scoring judge; threshold is tuned in role params",
	},
	custom: { input: "Upstream summary + AI instruction", output: "Custom deliverable summary", usage: "Persona goes in the role spec; the instruction holds the task" },
	condition: {
		input: "Upstream artifact text",
		output: "Keyword match or AI verdict routes to the true / false edge",
		usage: "Keyword matching by default; with AI judge on, routing follows the model verdict",
	},
	ai_judge: { input: "Upstream artifact text", output: "Model verdict routes to the pass / reject edge", usage: "Write the verdict question; model & thinking follow node config" },
	loop: { input: "Upstream artifact", output: "Passed through as-is; re-invokes downstream N times", usage: "For retry/batch; count capped by the breaker" },
	human: { input: "Artifact to approve", output: "Passes through on approve; pauses on reject", usage: "Add human confirmation before risky operations" },
	merge: { input: "Artifacts from multiple branches", output: "Aggregated and passed downstream", usage: "Join point after parallel fan-out" },
	subflow: { input: "Upstream summary", output: "The subflow's final deliverable", usage: "Fill in the subflow ID to reuse another canvas" },
	tool: { input: "Tool params / upstream summary", output: "Tool execution result summary", usage: "Configure a tool name like bash; state the purpose before executing" },
	knowledge: { input: "Question / keywords", output: "Retrieved evidence + synthesized answer", usage: "Configure TopK; build the local knowledge base first" },
	code: { input: "Data to process", output: "Script run result summary", usage: "Pick a language + entry note for processing/validation" },
	api: { input: "Upstream params", output: "Cleaned summary of the HTTP response", usage: "Configure URL + method to call external APIs" },
	memory: { input: "Write: upstream artifact; read: none", output: "Snapshot for the memory key", usage: "Share variables across branches; keep key names consistent" },
	end: { input: "All upstream aggregates", output: "Final deliverable (end of flow)", usage: "Put last to aggregate and display" },
};

/** 取某角色可见的字段（含 showIf 联动显隐） */
export function visibleRoleFields(
	role: CanvasNodeRole,
	config: Record<string, string | number | boolean | undefined> | undefined,
): RoleField[] {
	return (ROLE_FIELDS[role] ?? []).filter(
		(f) => !f.showIf || String(config?.[f.showIf.key] ?? "") === String(f.showIf.value),
	);
}

/** 节点输入与输出端口相对于节点顶部的 Y 轴圆心位置（单位 px） */
export const PORT_Y_OFFSET = 72;
