const images = document.querySelectorAll('img')
const callback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement
      const data_src = img.getAttribute('data-src')
      img.setAttribute('src', data_src!)
      observer.unobserve(img)
      console.log('懒加载')
    }
  })
}

const observer = new IntersectionObserver(callback)
images.forEach((img) => {
  observer.observe(img)
})
