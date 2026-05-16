import { useEffect, useState } from "react";
import ProductInfo from "../../Components/ProductDetails/ProductInfo";
import { useParams } from "react-router";
import { getSpecificProduct } from "../../services/products-services";
import HomeLoading from "../Home/HomeLoading";
import ProductTabs from "../../Components/ProductDetails/ProductTabs";
import RelatedProducts from "../../Components/ProductDetails/RelatedProducts";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

export default function ProductDetails() {

  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { id } = useParams();


  async function fetchDetails() {
    try {
      setIsLoading(true);
      const response = await getSpecificProduct({ id });
      console.log(response.data.data);
      if (response.success) {
        setIsLoading(false)
        setProductDetails(response.data.data)
      }


    } catch (error) {
      setIsLoading(false);
      setIsError(true)

    }
  }

  useEffect(() => {
    fetchDetails();
  }, [id])

  if (isLoading) {
    return <HomeLoading />
  }



  return <>
    <PageMetaData title={productDetails.title} description={productDetails.description} />
    <ProductInfo productDetails={productDetails} />
    <ProductTabs productDetails={productDetails} />
    <RelatedProducts productDetails={productDetails} />

  </>
}
