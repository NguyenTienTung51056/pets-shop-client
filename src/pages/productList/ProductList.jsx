import styled from "styled-components";

import Products from "~/components/Homes/Products";

import { mobile } from "~/responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Bộ lọc sản phẩm:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Màu sắc</Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="typeDetails" onChange={handleFilters}>
            <Option disabled>Loại động vật chi tiết</Option>
            <Option>alaska</Option>
            <Option>samoyed</Option>
            <Option>pitbull</Option>
            <Option>corgi</Option>
            <Option>poodle</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sắp xếp sản phẩm:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Mới nhất</Option>
            <Option value="asc">Giá (asc)</Option>
            <Option value="desc">Giá (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
    </Container>
  );
};

export default ProductList;
