import { getPostById } from "@/server/action";
import Link from "next/link";

type BlogDetailsProps = {
  params: Promise<{ id: string }>; 
};

const BlogDetails = async (props: BlogDetailsProps) => {
  const params = await props.params; 
  const { success, error } = await getPostById(Number(params.id));
  const postId = Number(params.id);

  if (isNaN(postId)) {
    return (
      <p className="text-red-500 text-center mt-6 text-lg font-medium">
        Invalid post ID
      </p>
    )
  }

  if (error) {
    return (
      <p className="text-red-500 text-center mt-6 text-lg font-medium">
        Error: {error}
      </p>
    );
  }

  if (!success) {
    return (
      <p className="text-gray-500 text-center mt-6 text-lg">
        Post not found
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{success.title}</h1>
        <p className="text-gray-700 leading-relaxed mb-6">{success.content}</p>

        <Link
          href="/"
          className="inline-block text-blue-600 hover:underline font-medium"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogDetails;
