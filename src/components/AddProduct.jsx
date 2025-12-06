import { useState } from "react";
import { Button, Drawer, Form, Input, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../services/service";

const AddProduct = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [placement] = useState("bottom");
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      message.success("Successfully added!");
      setOpen(false);
    },
  });
  const onFinish = (values) => {
    addMutation.mutate(values);
  };

  return (
    <>
      <Button
        style={{ margin: "30px 0", marginLeft: "1280px" }}
        variant="solid"
        color="green"
        onClick={showDrawer}
      >
        New Product
      </Button>
      <Drawer
        title="Basic Drawer"
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <Form
          name="add"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Product name"
            name="name"
            rules={[{ required: true, message: "Fill this line!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image (url)"
            name="img"
            rules={[{ required: true, message: "Fill this line!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price ($)"
            name="price"
            rules={[{ required: true, message: "Fill this line!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item style={{ marginLeft: "215px" }} label={null}>
            <Button variant="solid" color="green" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default AddProduct;
