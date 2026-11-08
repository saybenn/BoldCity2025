// Copied temporarily into pages/__review_avatar_qa.jsx by the local test setup.
// Never deployed or imported by the homepage. Colored PNG fixtures are mocked
// by Playwright; these are not reviewer photographs or customer review data.
import ReviewerAvatar from "@/components/ReviewerAvatar";

export function getServerSideProps() {
  if (process.env.NODE_ENV !== "development" || process.env.QA_AVATAR_FIXTURE !== "true") return {notFound:true};
  return {props:{expiresAt:Date.now()+60000}};
}

export default function ReviewerAvatarQa({expiresAt}) {
  const cases=[['loaded','Loaded image fixture','https://lh3.googleusercontent.com/a/TEST_ONLY_LOADED'],['broken','Broken image fixture','https://lh3.googleusercontent.com/a/TEST_ONLY_BROKEN'],['missing','Missing image fixture',null],['rejected','Rejected URL fixture','https://example.test/NOT_AN_AVATAR']];
  return <main className="p-8"><h1>Isolated avatar QA: synthetic colored images, no reviewer photos</h1><div className="mt-6 flex gap-6">{cases.map(([id,name,photoUrl])=><div key={id} data-avatar-fixture={id}><ReviewerAvatar name={name} avatar={photoUrl?{photoUrl,expiresAt}:null}/><p>{name}</p></div>)}</div></main>;
}
