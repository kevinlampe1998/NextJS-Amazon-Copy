'use client'; 

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useContext, useState, useRef } from "react";
import { Context } from "@/components/context-provider/component";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import domainName from "@/lib/domainName";
import Link from "next/link";
import automaticDeliveryPic from '/public/pictures/curology-pDsmoI5j3B8-unsplash.jpg';
import shopInYourCurrencyPic from '/public/pictures/currency-1680786_1920.png';

export default function Home() {
  const { clientDB, dispatch } = useContext(Context);
  const router = useRouter();
  const [ allProducts, setAllProducts ] = useState();
  const [ slideShowPics, setSlideShowPics ] = useState();
  const slideShow = useRef();
  const [slideShowLeftPosition, setSlideShowLeftPosition] = useState(3750);
  const chevronLeft = useRef();
  const chevronRight = useRef();
  
  const [ firstArea1, setFirstArea1 ] = useState();
  const [ firstArea2, setFirstArea2 ] = useState();
  const [ firstArea3, setFirstArea3 ] = useState();
  const [ firstArea4, setFirstArea4 ] = useState();
  
  const [ secondArea, setSecondArea ] = useState({ one: 0, two: 0, three: 0, four: 0 });

  const getAllProducts = async () => {
    const res = await fetch(`${process.env.NODE_ENV === 'production' ? domainName : ''}/api/home`);
    const data = await res.json();
    console.log('data', data);


    if (data.success) {
      
      const products = data.products;
      const essentialProducts = products.filter(product =>
        product.category !== 'Health & Household' &&
        product.subcategory !== 'Vitamins & Supplements' &&
        product.subcategory !== 'Pet Health Products');
      setAllProducts(essentialProducts);

      const booksAndAudible = products.filter(product => product.category === 'Books & Audible');
      const beautyAndPersonalCare = products.filter(product => product.category === 'Beauty & Personal Care');
      const kitchenAndDining =  products.filter(product => product.subcategory === 'Kitchen & Dining');
      const toys = products.filter(product =>
        product.category === 'Toys & Games' && product.subcategory !== 'Board Games');
      const electronicsAndComputers = products.filter(product => product.category === 'Electronics & Computers');
      const fashion =  products.filter(product => product.subcategory === 'Men’s Clothing' ||
        product.subcategory === 'Women’s Clothing' || product.subcategory === 'Kids’ Clothing' ||
        product.subcategory === 'Shoes'
      );
      const sportsAndOutdoors = products.filter(product => product.category === 'Sports & Outdoors');
      const homeDecor = products.filter(product => product.subcategory === 'Home Décor');
      console.log('homeDecor', homeDecor);

      const preSlideShowPics = [];
      preSlideShowPics.push(products[parseInt(Math.random() * (products.length - 1))].main_image.url);
      preSlideShowPics.push(products[parseInt(Math.random() * (products.length - 1))].main_image.url);
      preSlideShowPics.push(booksAndAudible[parseInt(Math.random() * (booksAndAudible.length - 1))].main_image.url);
      preSlideShowPics.push(beautyAndPersonalCare[parseInt(Math.random() * (beautyAndPersonalCare.length - 1))].main_image.url);
      preSlideShowPics.push(kitchenAndDining[parseInt(Math.random() * (kitchenAndDining.length - 1))].main_image.url);
      preSlideShowPics.push(toys[parseInt(Math.random() * (toys.length - 1))].main_image.url);
      setSlideShowPics(preSlideShowPics);

      const preFirstArea1 = [];
      while (preFirstArea1.length < 4) {  
        preFirstArea1.push(products[parseInt(Math.random() * (products.length - 1))]);
      }
      setFirstArea1(preFirstArea1);

      const preFirstArea2 = [];
      preFirstArea2.push(electronicsAndComputers[parseInt(Math.random() * (electronicsAndComputers.length - 1))]);
      preFirstArea2.push(kitchenAndDining[parseInt(Math.random() * (kitchenAndDining.length - 1))]);
      preFirstArea2.push(fashion[parseInt(Math.random() * (fashion.length - 1))]);
      preFirstArea2.push(sportsAndOutdoors[parseInt(Math.random() * (sportsAndOutdoors.length - 1))]);
      setFirstArea2(preFirstArea2);

      setFirstArea3(products[parseInt(Math.random() * (products.length - 1))]);

      setFirstArea4(products[parseInt(Math.random() * (products.length - 1))]);

      setSecondArea(prev => ({ ...prev, one: homeDecor[parseInt(Math.random() * (homeDecor.length - 1))] }));

      setSecondArea(prev => ({ ...prev, three: products[parseInt(Math.random() * (products.length - 1))] }));
    }
    
  };

  const slideToRight = () => {
    if (slideShowLeftPosition > -3750) {
      setSlideShowLeftPosition(slideShowLeftPosition - 1500);
    }
  };

  const slideToLeft = () => {
    if (slideShowLeftPosition < 3750) {
      setSlideShowLeftPosition(slideShowLeftPosition + 1500);
    }
  };

  useEffect(() => {
    console.log('slideShowLeftPosition', slideShowLeftPosition);

    if (slideShowLeftPosition === 3750) {
      chevronLeft.current.style.color = 'rgba(18, 25, 33, 1)';
    } else {
      chevronLeft.current.style.color = '#fff';
    }

    if (slideShowLeftPosition === -3750) {
      chevronRight.current.style.color = 'rgba(18, 25, 33, 1)';
    } else {
      chevronRight.current.style.color = '#fff';
    }

    slideShow.current.style.left = `${slideShowLeftPosition}px`;
  }, [slideShowLeftPosition]);

  useEffect(() => {
    clientDB.seller && router.push('/frontend/sellers/see-my-products');
  }, [clientDB]);

  useEffect(() => {
    getAllProducts();
  }, []);
  
  return (
  <div className={styles.homeBG}>
    <div className={styles.home}>
      <ChevronLeft size={60} className={styles.chevronLeft} onClick={slideToLeft} ref={chevronLeft}/>
      <ChevronRight size={60} className={styles.chevronRight} onClick={slideToRight} ref={chevronRight}/>
      <section className={styles.backgroundSlideshow} ref={slideShow}>

        {
          slideShowPics &&

           <>
            <div className={styles.slideElement}>
              <div>
                <h1>New Year, now you</h1>
                <p>Shop deals</p>
              </div>
              <Image
                src={slideShowPics[0]}
                alt='Slideshow picture'
                width={1500}
                height={600}
                style={{ width: '1500px', height: '600px' }}
              />
              <span className={styles.slideShowDarkOverlay}></span>
              <span className={styles.slideShowLightOverlayGradient}></span>
            </div>

            <div className={styles.slideElement}>
              <div>
                <h1>Just in: new gifts</h1>
                <h1>for the holidays</h1>
              </div>
              <Image
                src={slideShowPics[1]}
                alt='Slideshow picture'
                width={1500}
                height={600}
                style={{ width: '1500px', height: '600px' }}
              />
              <span className={styles.slideShowDarkOverlay}></span>
              <span className={styles.slideShowLightOverlayGradient}></span>
            </div>

            <div className={styles.slideElement}>
              <div>
                <h1>Shop Books</h1>
                <p>explore titles</p>
              </div>
              <Image
                src={slideShowPics[2]}
                alt='Slideshow picture'
                width={1500}
                height={600}
                style={{ width: '1500px', height: '600px' }}
              />
              <span className={styles.slideShowDarkOverlay}></span>
              <span className={styles.slideShowLightOverlayGradient}></span>
            </div>

            <div className={styles.slideElement}>
              <div>
                <h1>Beauty products</h1>
                <p>Explore top sellers</p>
              </div>
              <Image
                src={slideShowPics[3]}
                alt='Slideshow picture'
                width={1500}
                height={600}
                style={{ width: '1500px', height: '600px' }}
              />
              <span className={styles.slideShowDarkOverlay}></span>
              <span className={styles.slideShowLightOverlayGradient}></span>
            </div>

            <div className={styles.slideElement}>
              <div>
                <h1>Kitchen favorites</h1>
                <p>under $50</p>
              </div>
              <Image
                src={slideShowPics[4]}
                alt='Slideshow picture'
                width={1500}
                height={600}
                style={{ width: '1500px', height: '600px' }}
              />
              <span className={styles.slideShowDarkOverlay}></span>
              <span className={styles.slideShowLightOverlayGradient}></span>
            </div>

            <div className={styles.slideElement}>
              <div>
                <h1>New arrivals in Toys</h1>
              </div>
              <Image
                src={slideShowPics[5]}
                alt='Slideshow picture'
                width={1500}
                height={600}
                style={{ width: '1500px', height: '600px' }}
              />
              <span className={styles.slideShowDarkOverlay}></span>
              <span className={styles.slideShowLightOverlayGradient}></span>
            </div>
           </>

        }


      </section>
      <section className={styles.adverts}>

        <div className={styles.firstArea}>

          {
            firstArea1 &&

            <div
              className={styles.firstArea1}
            >
              <h2>Top Deals</h2>

              <div>
                {
                  firstArea1.map(product => (

                    <div key={product._id}>
                      <Image
                        src={product.main_image.url}
                        width={140}
                        height={120}
                        style={{ width: '140', height: '120' }}
                        alt={product.product_name}
                      />
                      <div>
                        <span>30% off</span>
                        <div>
                          <p>Limited time</p>
                          <p>deal</p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              

              <Link href='#'>Shop more deals</Link>

            </div>
          }

          {
            firstArea2 &&

              <div
                className={styles.firstArea1}
              >
                <h2>New to Amazon?</h2>

                <div>
                  {
                    firstArea2.map(product => (

                      <div key={product._id}>
                        <Image
                          src={product.main_image.url}
                          width={140}
                          height={120}
                          style={{ width: '140', height: '120' }}
                          alt={product.product_name}
                        />
                        <div>
                          {product.category}
                        </div>
                      </div>
                    ))
                  }
                </div>
                

                <Link href='#'>Explore all categories</Link>

              </div>
          }


          {
            firstArea3 &&

            <div className={styles.firstArea3}>
              <h2>New year deals, new year feels</h2>
              <Image
                src={firstArea3.main_image.url}
                width={310}
                height={315}
                style={{ width: '100%', height: '315px' }}
                alt={firstArea3.product_name}
              />
              <Link href='#'>See more</Link>
            </div>
          }

          {
            firstArea4 &&

              <div className={styles.firstArea4}>
                <div>
                  <h2>Sign in for your best</h2>
                  <h2>experience</h2>
                  <button>Sign in securely</button>
                </div>
                <div>
                  <h3>Find Gifts for everyone</h3>
                  <Image
                    src={firstArea4?.main_image?.url}
                    width={200}
                    height={100}
                    style={{ width: '200', height: '100px' }}
                    alt={firstArea4.product_name}
                  />
                </div>
              </div>

          }

        </div>

        <div className={styles.secondArea}>

          {
            secondArea.one && 

              <div className={styles.secondArea1}>
                <h2>Home Decor</h2>
                <Image
                  src={secondArea.one.main_image.url}
                  width={310}
                  height={315}
                  style={{ width: '100%', height: '315px' }}
                  alt={secondArea.one.product_name}
                />
                <Link href='#'>See more</Link>
              </div>

          }

          <div className={styles.secondArea2}>
            <h2>Save up to 15% with automatic</h2>
            <h2>delivery</h2>
            <Image
              src={automaticDeliveryPic}
              width={310}
              height={290}
              style={{ width: '100%', height: '290px' }}
              alt='automatic delivery picture'
            />
            <Link href='#'>Learn more</Link>
          </div>

          {

            secondArea.three &&

              <div className={styles.secondArea3}>
                <h2>From want it all to need it now</h2>
                  <Image
                    src={secondArea.three.main_image.url}
                    width={310}
                    height={315}
                    style={{ width: '100%', height: '315px' }}
                    alt={secondArea.three.product_name}
                  />
                  <Link href='#'>Shop now</Link>
              </div>
            
          }

          {

              secondArea.three &&

                <div className={styles.secondArea3}>
                  <h2>From want it all to need it now</h2>
                    <Image
                      src={shopInYourCurrencyPic}
                      width={310}
                      height={315}
                      style={{ width: '100%', height: '315px' }}
                      alt='shop in your currency picture'
                    />
                    <Link href='#'>Learn more</Link>
                </div>

          }

        </div>  
      </section>
    </div>
   </div>
  );
}
