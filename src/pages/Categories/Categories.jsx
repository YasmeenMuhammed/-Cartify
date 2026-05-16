import { FaLayerGroup } from 'react-icons/fa'
import BreadCrumb from '../../Components/BreadCrumb/BreadCrumb'
import HomeCategories from '../Home/HomeCategories'
import PageMetaData from '../../Components/PageMetaData/PageMetaData'

export default function Categories() {
  return (<>
    <PageMetaData title={"Categories"} />
    <BreadCrumb title="Categories" description="Browse our wide range of products" icon={<FaLayerGroup />} />
    <HomeCategories />

  </>
  )
}
