import gsap from "gsap"
import "./style.css"

const heroText = document.querySelector("h1") as HTMLHeadingElement
const heroTextSpans = heroText.querySelectorAll("span") as NodeListOf<HTMLSpanElement>
const images = document.querySelectorAll(".thumbnail .wrapper img") as NodeListOf<HTMLImageElement>
const thumbnails = document.querySelectorAll(`.thumbnail`) as NodeListOf<HTMLDivElement>
const footerLink = document.querySelector(".footer a") as HTMLAnchorElement

thumbnails.forEach((thumbnail) => {
  const thumbnailWrapper = thumbnail.querySelector(".wrapper") as HTMLDivElement
  const hoverDetector = thumbnail.querySelector(".hover-detector") as HTMLAnchorElement
  const currentImage = thumbnailWrapper.querySelector("img") as HTMLImageElement
  const { height, width } = currentImage.getBoundingClientRect()
  const text = thumbnail.querySelector(".thumbnail__text") as HTMLDivElement
  const placeholder = thumbnail.querySelector(".placeholder") as HTMLElement

  hoverDetector.addEventListener("mouseenter", () => {
    thumbnail.style.zIndex = "1"
    text.style.opacity = "1"
    placeholder.style.opacity = "0"
    heroText.classList.add("hovering")
    images.forEach((image) => (image.style.opacity = image !== currentImage ? "0" : "1"))
  })

  hoverDetector.addEventListener("mousemove", (e) => {
    gsap.to(thumbnailWrapper, {
      x: e.offsetX - 0.25 * width,
      y: e.offsetY - 0.5 * height,
      duration: 2,
    })
  })

  hoverDetector.addEventListener("mouseleave", () => {
    gsap.to(thumbnailWrapper, {
      x: 0,
      y: 0,
      duration: 4,
    })

    thumbnail.style.zIndex = "-1"
    text.style.opacity = "0"
    placeholder.style.opacity = "1"
    heroText.classList.remove("hovering")
    images.forEach((image) => (image.style.opacity = "1"))
  })
})

document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({})

  tl.from(heroTextSpans, {
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    opacity: 0,
    clipPath: "inset(100% 0% 0% 0%)",
    delay: 0.4,
  })

  tl.from(
    thumbnails,
    {
      scale: 0,
      opacity: 0,
      duration: 2,
    },
    "-=60%"
  )

  tl.from(
    footerLink,
    {
      opacity: 0,
      duration: 0.6,
    },
    "-=60%"
  )
})
