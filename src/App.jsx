import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getProducts, { deleteProduct } from "./services/service";
import { Button } from "antd";
import { message } from "antd";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import { useEffect, useState } from "react";

function App() {
  const queryClient = useQueryClient();
  const [index, setIndex] = useState(0);
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      message.warning("Product deleted. You can't restore it!");
    },
  });

  useEffect(() => {
    const dots = 5;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % dots);
    }, 250);

    return () => clearInterval(timer);
  }, []);

  if (isLoading)
    return (
      <div className="loader">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`dot ${i === index ? "active" : ""}`}></span>
        ))}
      </div>
    );
  if (error) return <h1 className="error-title">Please connect to API!</h1>;

  return (
    <div>
      <AddProduct />

      <div className="cards">
        {products.map((pt) => (
          <div key={pt.id} className="card">
            <h2>{pt.name}</h2>
            <img src={pt.img} alt={pt.name} />
            <h3>{pt.price}</h3>
            <div className="flex">
              <EditProduct id={pt.id} />
              <Button
                onClick={() => {
                  deleteMutation.mutate(pt.id);
                }}
                variant="solid"
                color="danger"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
