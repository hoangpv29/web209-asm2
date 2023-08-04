import { Button, Modal, message } from 'antd';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { IProduct } from '../../interface/index';
import { useUpdateProductMutation } from '../../redux/product/product.service';
import { productSchema } from '../../schema/product';

const ModalUpdateProduct = ({ open, setOpen, data }: any) => {
    const [updateProduct] = useUpdateProductMutation()
    const { values, handleSubmit, submitForm, setValues, handleChange, resetForm, errors, touched } = useFormik({
        initialValues: {
            title: '',
            img: '',
            brand: '',
            price: 0,
            categoryId: 0,
        },
        validationSchema: productSchema,
        onSubmit: async (values) => {
            const formatValues = {
                ...values,
            };
            try {
                await updateProduct(formatValues as IProduct);
                message.success('Thêm thành công!');
                setOpen(false);
            } catch (error) {
                message.destroy('Thất bại!');
            }
        },
    });
    useEffect(() => {
        setValues({ ...data });
    }, [data, setValues]);

    const handleCancel = () => {
        resetForm();
        setOpen(false);
    };
    return (
        <Modal
            title="Update"
            open={open}
            onCancel={handleCancel}
            width={600}
            style={{ top: 100 }}
            footer={[
                <Button onClick={handleCancel}>Cacel</Button>,
                <Button type="primary" onClick={submitForm}>
                    Oke
                </Button>,
            ]}
        >
            <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <label className="font-bold">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={values?.title}
                        onChange={handleChange}
                        className="p-2 border-2 border-gray-500 rounded outline-none"
                        placeholder="Nhập tên.."
                    />
                    {errors.title && touched.title && <p className="text-red-500">{errors.title}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-bold">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={values?.price}
                        onChange={handleChange}
                        className="p-2 border-2 border-gray-500 rounded outline-none"
                        placeholder="Nhập Giá.."
                    />
                    {errors.price && touched.price && <p className="text-red-500">{errors.price}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-bold">Image</label>
                    <input
                        type="text"
                        name="img"
                        value={values?.img}
                        onChange={handleChange}
                        className="p-2 border-2 border-gray-500 rounded outline-none"
                        placeholder="Nhập đưuòng dẫn ảnh.."
                    />
                    {errors.img && touched.img && <p className="text-red-500">{errors.img}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-bold">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        value={values?.brand}
                        onChange={handleChange}
                        className="p-2 border-2 border-gray-500 rounded outline-none"
                        placeholder="Nhập thương hiệu.."
                    />
                    {errors.brand && touched.brand && <p className="text-red-500">{errors.brand}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-bold">Category</label>
                    <select name="categoryId" id="" onChange={handleChange}>
                        <option selected>Vui lòng chọn</option>
                        <option value="1" selected={data.categoryId === 1 ? true : false}>
                            Điện thoại
                        </option>
                        <option value="2" selected={data.categoryId === 2 ? true : false}>
                            Laptop
                        </option>
                        <option value="3" selected={data.categoryId === 3 ? true : false}>
                            Đồng hồ
                        </option>
                    </select>
                    {errors.categoryId && touched.categoryId && <p className="text-red-500">{errors.categoryId}</p>}
                </div>
            </form>
        </Modal>
    );
};

export default ModalUpdateProduct;
