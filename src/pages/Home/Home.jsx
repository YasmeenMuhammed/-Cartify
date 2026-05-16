import HomeSlider from '../../Components/Home/HomeSlider'
import HomeCategories from './HomeCategories'
import HomeDeals from './HomeDeals';
import HomeIcons from './HomeIcons';
import FeaturedProducts from './FeaturedProducts';
import HomeReviews from './HomeReviews';

export default function Home() {
  return (
    <div>
      <HomeSlider/>
      <HomeIcons/>
      <HomeCategories/> 
      <HomeDeals/>
      <FeaturedProducts/>
      <HomeReviews/>
    </div>
  )
}
