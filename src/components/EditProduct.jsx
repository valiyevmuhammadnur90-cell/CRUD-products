import { useState } from "react";
import { Button, message, Modal, Form, Input } from "antd";
import api from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditProduct = ({ id }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const editMutation = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      message.success("Successfully saved!");
      setIsModalOpen(false);
    },
  });
  const onFinish = (values) => {
    editMutation.mutate(values);
  };

  async function editProduct(values) {
    const res = await api.patch(`/products/${id}`, values);
    return res.data;
  }

  return (
    <>
      <Button variant="filled" color="magenta" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title=""
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
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

          <Form.Item style={{ marginLeft: "145px" }} label={null}>
            <Button variant="solid" color="green" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditProduct;
