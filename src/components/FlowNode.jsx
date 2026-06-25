export function FlowNode({ label, className = '' }) {
  return <span className={`flow-node ${className}`} aria-hidden="true"><span>{label}</span></span>
}
