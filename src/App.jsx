import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getProducts, { deleteProduct } from "./services/service";
import { Button } from "antd";
import { message } from "antd";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

function App() {
  const queryClient = useQueryClient();
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
      message.warning("Product deleted. You can't return it!");
    },
  });

  if (isLoading)
    return (
      <div>
        <div className="stick-1"></div>
        <div className="stick-2"></div>
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
