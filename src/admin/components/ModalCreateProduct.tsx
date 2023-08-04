import { Button, Modal, message } from 'antd';
import { useFormik } from 'formik';
//import { v4 as uuidv4 } from 'uuid';
import { IProduct } from '../../interface/index';
import { useNewProductMutation } from '../../redux/product/product.service';

import { productSchema } from '../../schema/product';

const ModalCreateProduct = ({ open, setOpen }: any) => {
    const [newProduct] = useNewProductMutation();
    const { values, handleSubmit, submitForm, handleChange, resetForm, errors, touched } = useFormik({
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
                await newProduct(formatValues as IProduct);
                message.success('Thêm thành công!');
                setOpen(false);
            } catch (error) {
                message.destroy('Thất bại!');
            }
        },
    });

    const handleCancel = () => {
        resetForm();
        setOpen(false);
    };
    return (
        <Modal
            title="Create"
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
                        value={values.title}
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
                        value={values.price || 0}
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
                        value={values.img}
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
                        value={values.brand}
                        onChange={handleChange}
                        className="p-2 border-2 border-gray-500 rounded outline-none"
                        placeholder="Nhập thương hiệu.."
                    />
                    {errors.brand && touched.brand && <p className="text-red-500">{errors.brand}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-bold">Category</label>
                    <select name="categoryId" id="" onChange={handleChange}>
                        <option selected value="">
                            Vui lòng chọn
                        </option>
                        <option value="1">Điện thoại</option>
                        <option value="2">Laptop</option>
                        <option value="3">Đồng hồ</option>
                    </select>
                    {errors.categoryId && touched.categoryId && <p className="text-red-500">{errors.categoryId}</p>}
                </div>
            </form>
        </Modal>
    );
};

export default ModalCreateProduct;
