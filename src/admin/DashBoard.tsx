import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Table, message } from "antd";
import { useState } from "react";
import {
  useDeleteProductByIdMutation,
  useGetProductsQuery,
} from "../redux/product/product.service";
import ModalCreateProduct from "./components/ModalCreateProduct";
import ModalUpdateProduct from "./components/ModalUpdateProduct";

const DashboardProduct = () => {
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();

  const [deleteProduct] = useDeleteProductByIdMutation();
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Image",
      render: (data: any) => {
        return (
          <img
            src={data.img}
            className="rounded"
            style={{ width: "50px", height: "50px" }}
            alt="imag"
          />
        );
      },
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
    },
    {
      title: "Actions",
      render: (data: any) => {
        return (
          <div className="flex gap-3">
            <Button
              type="primary"
              onClick={() => {
                setDataUpdate(data);
                setOpenModalUpdate(true);
              }}
            >
              Edit
            </Button>
            <Button
              type="default"
              className="bg-red-500 text-white"
              onClick={() => handleDelete(data.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const { data: products } = useGetProductsQuery();

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: "Delete",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc chắn muốn xóa không",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        await deleteProduct(id);
        message.success("Xóa thành công");
      },
      onCancel() {
        message.destroy("Xóa thất bại");
      },
    });
  };

  return (
    <div>
      <Button
        type="primary"
        className="mb-6"
        onClick={() => setOpenModalCreate(true)}
      >
        Thêm mới
      </Button>
      <Table
        columns={columns}
        dataSource={products?.map((item, index) => {
          return {
            key: index,
            id: item.id,
            title: item.title,
            price: item.price,
            brand: item.brand,
            img: item.img,
            categoryId: item.categoryId,
          };
        })}
        size="middle"
      />
      <ModalCreateProduct open={openModalCreate} setOpen={setOpenModalCreate} />
      {openModalUpdate && dataUpdate && (
        <ModalUpdateProduct
          open={openModalUpdate}
          setOpen={setOpenModalUpdate}
          data={dataUpdate}
        />
      )}
    </div>
  );
};

export default DashboardProduct;
