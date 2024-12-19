import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks/hooks";
import { fetchData } from "../../../Redux/Features/Data/dataSlice";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

const Marketplace = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-maxWidth grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card hoverable cover={<img alt={item.imageUrl} src={item.imageUrl} />}>
          <Meta description={item.description} />

          <div className="flex justify-between mt-4">
            <span className="flex justify-center items-center gap-1">
              <Meta className="font-bold" description="Likes:" />{" "}
              <Meta className="font-bold" description={item.like} />
            </span>
            <span className="flex justify-center items-center gap-1">
              <Meta className="font-bold" description="Unlikes:" />{" "}
              <Meta className="font-bold" description={item.unlike} />
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Marketplace;
