import Button from "@/components/Button";
import ModalBox from "@/components/ModalBox";
import { deletePost, getAllPost } from "@/server/action";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  content: string;
};

const BlogPage = async () => {
  const { error, success } = await getAllPost();

  if (error) {
    return (
      <p className="text-red-500 text-center mt-6 text-lg font-medium">
        Error: {error}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Our Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read the latest news, updates, and tutorials from our team.
          </p>
          <div className="mt-8 flex justify-center">
            <ModalBox />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {success?.map((post) => (
            <article
              key={post.id}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col"
            >
              <div className="my-4 flex gap-3">
                <Link
                  href={`/blog/${post.id}/edit`}
                  className="px-3 py-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 text-sm flex items-center gap-1"
                >
                  <Pencil size={14} /> Edit
                </Link>

                <form action={deletePost}>
                  <input type="hidden" name="id" value={post.id} />
                  <button
                    type="submit"
                    className="px-3 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 text-sm flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </form>
              </div>

              <div className="mb-4">
                <h3 className="text-2xl font-semibold mb-2 text-gray-900 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-700 line-clamp-4">{post.content}</p>
              </div>

              <Link
                href={`/blog/${post.id}`}
                aria-label={`Read more about ${post.title}`}
                className="mt-auto text-blue-600 font-medium hover:text-blue-500 hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
