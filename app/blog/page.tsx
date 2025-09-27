import Button from "@/components/Button";
import ModalBox from "@/components/ModalBox";
import { getAllPost } from "@/server/action";
import { Trash2 } from "lucide-react";

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
        {/* Header Section */}
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

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {success?.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                  {post.title}
                </h3>
                <p className="text-gray-700 line-clamp-4 mb-4">
                  {post.content}
                </p>
              </div>
              <div className="flex justify-between">
                 <a
                href={`/blog/${post.id}`}
                aria-label={`Read more about ${post.title}`}
                className="mt-auto text-blue-600 font-medium hover:text-blue-500 hover:underline"
              >
                Read more →
              </a>
              <Button label="" variant="danger" className="">
                <Trash2 size={18} />
              </Button>
             </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
