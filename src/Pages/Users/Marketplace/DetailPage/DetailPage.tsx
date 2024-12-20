import {
  Button,
  Descriptions,
  DescriptionsProps,
  Form,
  Input,
  Rate,
} from "antd";
import TextArea from "antd/es/input/TextArea";

const DetailPage = () => {
  const data = {
    id: 1,
    like: 123,
    unlike: 45,
    image: "https://i.ibb.co/zrCDdx4/pngwing.png",
    description:
      "Buying old Gmail accounts can offer numerous benefits. They provide trust, better email deliverability, and enhanced marketing opportunities. Ensure you choose reputable sources to avoid issues. Invest in old Gmail accounts today to boost your online presence and credibility. Secure the advantages of established email accounts for your business growth.buy old gmail accounts.",
    productName: "Buy Old Gmail Accounts",
    uploaderName: "Mahmood",
    category: "Email",
    phone: "01788126796",
    whatsApp: "01866026796",
    address: "Niketon Bazar, Gulshan 1",
    telegram: "https://telegram.org/",
    facebook: "https://www.facebook.com/",
  };

  const items: DescriptionsProps["items"] = [
    {
      label: "Uploader",
      children: data.uploaderName,
    },
    {
      label: "Phone",
      children: data.phone,
    },
    {
      label: "Address",
      children: data.address,
    },

    {
      label: "Facebook",
      children: (
        <a
          href={data.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 w-1/4"
        >
          Link
        </a>
      ),
    },
    {
      label: "Telegram",
      children: (
        <a
          href={data.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 w-1/4"
        >
          Link
        </a>
      ),
    },
    {
      label: "WhatsApp",
      children: (
        <a
          href={`https://wa.me/${data.whatsApp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 w-1/4"
        >
          Link
        </a>
      ),
    },

    // Third row: Likes and Unlikes
    {
      label: "Likes",
      children: data.like,
    },
    {
      label: "Unlikes",
      children: data.unlike,
    },
  ];

  const onFinish = (values: any) => {
    console.log("Form submitted with values: ", values);
  };

  return (
    <div className="ml-10 max-w-maxWidth mx-auto md:p-4">
      <div className="flex flex-col md:flex-row md:p-4 p-1 mb-6">
        <div className="pl-6 pr-1 flex-1 max-h-96 max-w-96 overflow-hidden">
          <img
            src={data.image}
            alt={data.productName}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 flex flex-col gap-2 justify-center items-start pl-6 md:mt-0 mt-6">
          <Button
            className="pointer-events-none"
            color="primary"
            variant="filled"
          >
            {data.category}
          </Button>
          <h1 className="text-4xl font-bold mb-2">{data.productName}</h1>
          <p className="text-base text-gray-700">{data.description}</p>
        </div>
      </div>

      <div className="pl-6 pr-1 mb-6">
        <h1 className="text-2xl font-medium my-6">
          Service provider information :
        </h1>
        <Descriptions bordered items={items} />
      </div>

      <div className="pl-6 pr-1 mb-20">
        <h1 className="text-2xl font-medium my-6">Reviews :</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review, index) => (
            <div key={index} className="p-4 border rounded-md">
              <div className="font-semibold mb-1">{review.userName}</div>
              <Form.Item label="Rate">
                <Rate className="pointer-events-none" value={review?.rating} />
              </Form.Item>
              <div className="-mt-7">{review.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pl-6 pr-1 mb-20 max-w-96">
        <h1 className="text-2xl font-medium my-6">Add a Review :</h1>
        <Form layout="vertical" onFinish={onFinish} className="space-y-4 border rounded-md p-4">
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please choose stars" }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            label="Your Name"
            name="userName"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Review Description"
            name="description"
            rules={[{ required: true, message: "Please enter a review" }]}
          >
            <TextArea rows={4} placeholder="Enter your review here" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Review
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
const reviews = [
  {
    userName: "John Doe",
    rating: 4,
    description:
      "Great service! The Gmail account was really helpful for my business. Highly recommended.",
  },
  {
    userName: "Jane Smith",
    rating: 5,
    description:
      "I am happy with the purchase, smooth transaction and excellent support.",
  },
  {
    userName: "Jane Smith",
    rating: 3,
    description:
      "I am happy with the purchase, smooth transaction and excellent support.",
  },
  {
    userName: "John Doe",
    rating: 5,
    description:
      "Great service! The Gmail account was really helpful for my business. Highly recommended.",
  },
];
export default DetailPage;
