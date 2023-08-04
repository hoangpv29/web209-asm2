import { Select } from 'antd';
import Search from 'antd/es/input/Search';
import { useState } from 'react';
import Product from '../../components/Product';
import { useGetCategoriesQuery } from '../../redux/category/category.service';
import { useGetProductsQuery } from '../../redux/product/product.service';

const Home = () => {
    const { data: categories } = useGetCategoriesQuery();
    const [searchValue, setSearchValue] = useState<string>('');
    const [categoryId, setcategoryId] = useState<number>();
    const { data: products } = useGetProductsQuery({ q: searchValue, categoryId });

    return (
        <section className="container mx-auto">
            <h2 className="text-4xl py-10 text-center font-medium text-gray-700">Products</h2>
            <div className="mb-10 flex justify-between w-[80%] mx-auto">
                <Search
                    placeholder="Tìm kiếm"
                    onChange={(e) => setSearchValue(e.target.value)}
                    enterButton
                    style={{
                        width: 304,
                    }}
                />
                <Select
                    defaultValue="All products"
                    style={{
                        width: 220,
                    }}
                    options={categories?.map((item) => {
                        return {
                            value: item.id,
                            label: item.name,
                        };
                    })}
                    onSelect={(value) => setcategoryId(+value)}
                />
            </div>
            <div className="grid grid-cols-3 gap-10 w-[80%] mx-auto pb-20">
                {products?.map((product) => (
                    <Product key={product.id} {...product} />
                ))}
            </div>
        </section>
    );
};

export default Home;
