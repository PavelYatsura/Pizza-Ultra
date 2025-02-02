import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={440}
    viewBox="0 0 280 440"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="140" cy="130" r="128" />
    <rect x="7" y="260" rx="5" ry="5" width="259" height="30" />
    <rect x="7" y="300" rx="5" ry="5" width="259" height="78" />
    <rect x="7" y="388" rx="5" ry="5" width="68" height="38" />
    <rect x="149" y="390" rx="5" ry="5" width="118" height="38" />
  </ContentLoader>
);

export default Skeleton;
