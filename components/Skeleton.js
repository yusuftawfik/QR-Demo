// Presentational skeleton pieces used by each route's loading.js. Plain
// server-renderable components (no hooks) — the shimmer is pure CSS
// (see .skel in globals.css) so no client JS is needed just to show a
// loading state.

export function SkelBox({ width, height, radius = 'var(--r-sm)', circle = false, style }) {
  return (
    <div
      className={`skel${circle ? ' skel-circle' : ''}`}
      style={{ width, height, borderRadius: circle ? '50%' : radius, ...style }}
    />
  );
}

export function DishCardSkeleton() {
  return (
    <div className="dish">
      <SkelBox width="100%" height={124} radius={0} />
      <div className="info">
        <div className="row">
          <SkelBox width="60%" height={12} />
          <SkelBox width={30} height={12} />
        </div>
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }) {
  return (
    <div className="grid">
      {Array.from({ length: count }).map((_, i) => (
        <DishCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TopBarSkeleton() {
  return (
    <div className="topbar">
      <SkelBox width={46} height={46} circle />
      <div className="who" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <SkelBox width={90} height={12} />
        <SkelBox width={60} height={10} />
      </div>
      <SkelBox width={70} height={24} radius="var(--r-pill)" />
    </div>
  );
}

export function PillsSkeleton({ count = 3 }) {
  return (
    <div className="pills">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="pill">
          <SkelBox width={58} height={58} circle />
          <SkelBox width={40} height={9} />
        </div>
      ))}
    </div>
  );
}

export function BackRowSkeleton() {
  return (
    <div className="backrow">
      <SkelBox width={36} height={36} circle />
      <SkelBox width={120} height={18} />
    </div>
  );
}

export function SearchSkeleton() {
  return <SkelBox width="100%" height={42} radius="var(--r-pill)" style={{ marginBottom: 22 }} />;
}

export function LineItemSkeleton() {
  return (
    <div className="line-item">
      <SkelBox width={44} height={44} radius="var(--r-sm)" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <SkelBox width="55%" height={12} />
        <SkelBox width="30%" height={10} />
      </div>
    </div>
  );
}
