import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { AuthButton } from "./components/auth-button-client";
import { AuthButtonServer } from "./components/auth-button-server";
import { redirect } from "next/navigation";
import PostCard from "./components/post-card";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { data: posts } = await supabase.from("posts").select("*, users(*)");

  console.log(session);
  if (session === null) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthButtonServer />
      {posts?.map((post) => {
        const { id, users, content } = post;

        const {
          user_name: userName,
          name: userFullName,
          avatar_url: avatarUrl,
        }= users;

        return (
          <PostCard
            userName={userName}
            userFullName={userFullName}
            avatarUrl={avatarUrl}
            content={content}
          />
        );
      })}
    </main>
  );
}
