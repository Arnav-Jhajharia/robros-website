import { useRect } from '@studio-freight/hamo'
import cn from 'clsx'
import Cardss from 'components/cardss'
import { Button } from 'components/button'
import { Card } from 'components/card'
import { Title } from 'components/intro'
import { Link } from 'components/link'
import { ListItem } from 'components/list-item'
import { projects } from 'content/projects'
import { useScroll } from 'hooks/use-scroll'
import { Layout } from 'layouts/default'
import { button, useControls } from 'leva'
import Gallery from 'components/gallery'
import { clamp, mapRange } from 'lib/maths'
import { useStore } from 'lib/store'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useIntersection, useWindowSize } from 'react-use'
import s from './home.module.scss'
import GlobalError from 'next/dist/client/components/error-boundary'
import TeamPage  from 'components/teampage'
const SFDR = dynamic(() => import('icons/sfdr.svg'), { ssr: false })
const GitHub = dynamic(() => import('icons/github.svg'), { ssr: false })

const Parallax = dynamic(
  () => import('components/parallax').then((mod) => mod.Parallax),
  { ssr: false }
)

const AppearTitle = dynamic(
  () => import('components/appear-title').then((mod) => mod.AppearTitle),
  { ssr: false }
)

const HorizontalSlides = dynamic(
  () =>
    import('components/horizontal-slides').then((mod) => mod.HorizontalSlides),
  { ssr: false }
)

const FeatureCards = dynamic(
  () => import('components/feature-cards').then((mod) => mod.FeatureCards),
  { ssr: false }
)

const WebGL = dynamic(
  () => import('components/webgl').then(({ WebGL }) => WebGL),
  { ssr: false }
)

const HeroTextIn = ({ children, introOut }) => {
  return (
    <div className={cn(s['hide-text'], introOut && s['show-text'])}>
      {children}
    </div>
  )
}

export default function Home() {
  const [hasScrolled, setHasScrolled] = useState()
  const zoomRef = useRef(null)
  const [zoomWrapperRectRef, zoomWrapperRect] = useRect()
  const { height: windowHeight } = useWindowSize()
  const introOut = useStore(({ introOut }) => introOut)

  const [theme, setTheme] = useState('dark')
  const lenis = useStore(({ lenis }) => lenis)

  useControls(
    'lenis',
    () => ({
      stop: button(() => {
        lenis.stop()
      }),
      start: button(() => {
        lenis.start()
      }),
    }),
    [lenis]
  )

  useControls(
    'scrollTo',
    () => ({
      immediate: button(() => {
        lenis.scrollTo(30000, { immediate: true })
      }),
      smoothDuration: button(() => {
        lenis.scrollTo(30000, { lock: true, duration: 10 })
      }),
      smooth: button(() => {
        lenis.scrollTo(30000)
      }),
      forceScrollTo: button(() => {
        lenis.scrollTo(30000, { force: true })
      }),
    }),
    [lenis]
  )

  useEffect(() => {
    if (!lenis) return

    function onClassNameChange(lenis) {
      console.log(lenis.className)
    }

    lenis.on('className change', onClassNameChange)

    return () => {
      lenis.off('className change', onClassNameChange)
    }
  }, [lenis])

  useScroll(({ scroll }) => {
    setHasScrolled(scroll > 10)
    if (!zoomWrapperRect.top) return

    const start = zoomWrapperRect.top + windowHeight * 0.5
    const end = zoomWrapperRect.top + zoomWrapperRect.height - windowHeight

    const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1)
    const center = 0.6
    const progress1 = clamp(0, mapRange(0, center, progress, 0, 1), 1)
    const progress2 = clamp(0, mapRange(center - 0.055, 1, progress, 0, 1), 1)
    setTheme(progress2 === 1 ? 'light' : 'dark')

    zoomRef.current.style.setProperty('--progress1', progress1)
    zoomRef.current.style.setProperty('--progress2', progress2)

    if (progress === 1) {
      zoomRef.current.style.setProperty('background-color', 'currentColor')
    } else {
      zoomRef.current.style.removeProperty('background-color')
    }
  })

  const [whyRectRef, whyRect] = useRect()
  const [cardsRectRef, cardsRect] = useRect()
  const [whiteRectRef, whiteRect] = useRect()
  const [featuresRectRef, featuresRect] = useRect()
  const [inuseRectRef, inuseRect] = useRect()

  const addThreshold = useStore(({ addThreshold }) => addThreshold)
  useEffect(() => {
    const textElement = document.getElementById('big-text');

    function handleScroll() {
      const scrollY = window.scrollY;
      const scale = Math.max(1 - scrollY / 500, 0);
      const translateY = -scrollY / 2; // Control upward movement

      // Updating transform properties
      textElement.style.transform = `translate(0, ${translateY}px) scale(${scale})`;
      textElement.style.opacity = scale;
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    addThreshold({ id: 'top', value: 0 })
  }, [])

  useEffect(() => {
    const top = whyRect.top - windowHeight / 2
    addThreshold({ id: 'why-start', value: top })
    addThreshold({
      id: 'why-end',
      value: top + whyRect.height,
    })
  }, [whyRect])

  useEffect(() => {
    const top = cardsRect.top - windowHeight / 2
    addThreshold({ id: 'cards-start', value: top })
    addThreshold({ id: 'cards-end', value: top + cardsRect.height })
    addThreshold({
      id: 'red-end',
      value: top + cardsRect.height + windowHeight,
    })
  }, [cardsRect])

  useEffect(() => {
    const top = whiteRect.top - windowHeight
    addThreshold({ id: 'light-start', value: top })
  }, [whiteRect])

  useEffect(() => {
    const top = featuresRect.top
    addThreshold({ id: 'features', value: top })
  }, [featuresRect])

  useEffect(() => {
    const top = inuseRect.top
    addThreshold({ id: 'in-use', value: top })
  }, [inuseRect])

  useEffect(() => {
    const top = lenis?.limit
    addThreshold({ id: 'end', value: top })
  }, [lenis?.limit])

  useScroll((e) => {
    console.log(window.scrollY, e.scroll, e.isScrolling, e.velocity, e.isLocked)
    // console.log(e.isScrolling)
  })

  const inUseRef = useRef()

  const [visible, setIsVisible] = useState(false)
  const intersection = useIntersection(inUseRef, {
    threshold: 0.2,
  })
  useEffect(() => {
    if (intersection?.isIntersecting) {
      setIsVisible(true)
    }
  }, [intersection])

  return (
    <Layout
      theme={theme}
      seo={{
        title: 'RoBros',
        description:
          '',
      }}
      className={s.home}
    >
      <div className={s.canvas}>
        <WebGL />
      </div>
      <section className={s.hero}>
        <div className="layout-grid-inner">
          <Title className={s.title} thing = {"RoBros"} />
          <SFDR className={cn(s.icon, introOut && s.show)} />
          <span className={cn(s.sub)}>
            
          </span>
        </div>

        <div className={cn(s.bottom, 'layout-grid')}>
          <div
            className={cn(
              'hide-on-mobile',
              s['scroll-hint'],
              hasScrolled && s.hide,
              introOut && s.show
            )}
          >
            <div className={s.text}>
              <HeroTextIn introOut={introOut}>
                <p>scroll</p>
              </HeroTextIn>
              <HeroTextIn introOut={introOut}>
                <p> to explore</p>
              </HeroTextIn>
            </div>
          </div>
          <h1 className={cn(s.description, 'p-s')}>
            <HeroTextIn introOut={introOut}>
              <p className="p-s"> A new smooth scroll library</p>
            </HeroTextIn>
            <HeroTextIn introOut={introOut}>
              <p className="p-s">fresh out of the</p>
            </HeroTextIn>
            <HeroTextIn introOut={introOut}>
              <p className="p-s">Studio Freight Darkroom</p>
            </HeroTextIn>
          </h1>
          <Button
            className={cn(s.cta, introOut && s.in)}
            arrow
            icon={<GitHub />}
            href="https://github.com/studio-freight/lenis"
          >
            Check it out on github
          </Button>
        </div>
      </section>


          <section className={s.rethink}>
        <div className={cn('layout-grid', s.pre)}>
           
          
        </div>
        <div className={s.cards} ref={cardsRectRef}>
          <HorizontalSlides>
            <Card
              className={s.card}
              number="RoVolt"
              text="Innovation on six legs."
              background='https://res.cloudinary.com/dm79plror/image/upload/v1700277568/Screenshot_2023-11-18_at_8.48.41_AM_i4ug8u.png'
                
            
            />
            <Card
              className={s.card}
              number="RoAI"
              background='https://images.unsplash.com/photo-1581677641984-cf14ca58c5ee?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww'
              text="Advanced traffic recognition model designed for the car"
            />
            <Card
              className={s.card}
              number="RoPlant"
              text="Your garden's tech companion."
              background='https://res.cloudinary.com/dm79plror/image/upload/v1700278263/WhatsApp_Image_2023-11-18_at_09.00.21_mavynh.jpg'
            />
            <Card
              className={s.card}
              number="RoCar"
              background='https://res.cloudinary.com/dm79plror/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1700278768/WhatsApp_Image_2023-11-18_at_09.09.08_cl9zmi.jpg'
              text="Minor car, major innovation"
            />
            <Card
              className={s.card}
              number="App"
              text="Control with a tap."
            />
          </HorizontalSlides>
        </div>
      </section>
{/* 
      <section className={s.hero}>
        <div className="layout-grid-inner">
          <Title className={s.title} />
          <SFDR className={cn(s.icon, introOut && s.show)} />
          <span className={cn(s.sub)}>
            <HeroTextIn introOut={introOut}>
              <h2 className={cn('h3', s.subtitle)}>Smooth Scroll</h2>
            </HeroTextIn>
            <HeroTextIn introOut={introOut}>
              <h2 className={cn('p-xs', s.tm)}>
                <span>©</span> {new Date().getFullYear()} Studio Freight
              </h2>
            </HeroTextIn>
          </span>
        </div>

        <div className={cn(s.bottom, 'layout-grid')}>
          <div
            className={cn(
              'hide-on-mobile',
              s['scroll-hint'],
              hasScrolled && s.hide,
              introOut && s.show
            )}
          >
            <div className={s.text}>
              <HeroTextIn introOut={introOut}>
                <p>scroll</p>
              </HeroTextIn>
              <HeroTextIn introOut={introOut}>
                <p> to explore</p>
              </HeroTextIn>
            </div>
          </div>
          <h1 className={cn(s.description, 'p-s')}>
            <HeroTextIn introOut={introOut}>
              <p className="p-s"> A new smooth scroll library</p>
            </HeroTextIn>
            <HeroTextIn introOut={introOut}>
              <p className="p-s">fresh out of the</p>
            </HeroTextIn>
            <HeroTextIn introOut={introOut}>
              <p className="p-s">Studio Freight Darkroom</p>
            </HeroTextIn>
          </h1>
          <Button
            className={cn(s.cta, introOut && s.in)}
            arrow
            icon={<GitHub />}
            href="https://github.com/studio-freight/lenis"
          >
            Check it out on github
          </Button>
        </div>
      </section> */}
      
      `<section className={s.rethink}>
       
      </section>
      <section
        ref={(node) => {
          zoomWrapperRectRef(node)
          zoomRef.current = node
        }}
        className={s.solution}
      >
        <div className={s.inner}>
          <div className={s.zoom}>
            <h2 className={cn(s.first, 'h1 vh')}>
              what is <br />
              <span className="contrast">Robotics</span>
            </h2>
            <h2 className={cn(s.enter, 'h3 vh')}>
              Enter <br /> <p className={cn(s.haydes) }>RoBros</p>
            </h2>
            <h2 className={cn(s.second, 'h1 vh')}>to us</h2>
          </div>
        </div>
      </section>
      <section className={cn('theme-light', s.featuring)} ref={whiteRectRef}>
        <div className={s.inner}>
          <div className={cn('layout-block', s.intro)}>
            <p className="p-l">
              It's not just what we do {' '}
              <Link
                className="contrast semi-bold"
                href="https://github.com/studio-freight/lenis"
              >
                best <br />
              </Link>{' '}
           <br /> We're a community of learners, experimenters and builders
            </p>
          </div>
        </div>
        {/* <section ref={featuresRectRef}>
          <FeatureCards />
        </section> */}
      </section>
       <section className={s.why} data-lenis-scroll-snap-align="start">
        <div className="layout-grid">
          <h2 className={cn(s.sticky, 'h2')}>
            <AppearTitle>Our awards</AppearTitle>
          </h2>
          <aside className={s.features} ref={whyRectRef}>
          
            <div className={s.feature}>
              <h3 className={cn(s.title, 'h4')}>
                La Martiniere for Boys Science Exhibition 2022 🥇
              </h3>
              
            </div>
            <div className={s.feature}>
              <h3 className={cn(s.title, 'h4')}>
                ADAMAS University (State) 🥇
              </h3>
            
            </div>
            <div className={s.feature}>
              <h3 className={cn(s.title, 'h4')}>
                Smart Bengal Hackathon (State/National) 🥇
              </h3>
              
            </div>
            <div className={s.feature}>
              <h3 className={cn(s.title, 'h4')}> 
                La Martiniere for Boys Science Exhibition 2023 🥇
              </h3>
              
            </div>
            <div className={s.feature}>
              <h3 className={cn(s.title, 'h4')}>
                Calcutta Boys School Science Exhibition @ Concord 2023 🥇
              </h3>
              
            </div>
            <div className={s.feature}>
              <h3 className={cn(s.title, 'h4')}>
                Don Bosco Park Circus EXPO @ BOSCO Fest 2023 🥇
              </h3>
              
            </div>
       
              <div className={s.feature}>
              <h3 className={cn(s.title, 'h4')}>
                DPS Ruby Park Droid Wars @ LOGIQUE 🥈
              </h3>
             
            </div>
          </aside>
        </div>
      </section>

       
    <div style={{"maxWidth":'100vw', 'maxHeight': '100vh'}}><Gallery /></div>  
    {/* <TeamPage /> */}
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      id: 'home',
    }, // will be passed to the page component as props
  }
}
