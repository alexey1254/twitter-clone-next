import PostCard from "./post-card";

export function PostList({ posts }) {
  return (
    <>
      {posts?.map((post) => {
        const { id, users, content } = post;

        const {
          user_name: userName,
          name: userFullName,
          avatar_url: avatarUrl,
        } = users;

        return (
          <PostCard
            userName={userName}
            userFullName={userFullName}
            avatarUrl={avatarUrl}
            content={content}
          />
        );
      })}
    </>
  );
}
