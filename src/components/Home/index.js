/* eslint-disable no-nested-ternary */
import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const Home = () => {
  const [value, setValue] = useState('ALL')
  const [isLoading, setIsLoading] = useState(true)
  const [isFailed, setIsFailed] = useState(false)
  const [projects, setProjects] = useState([])
  const url = `https://apis.ccbp.in/ps/projects?category=${value}`
  console.log(projects)
  useEffect(() => {
    const getData = async () => {
      const options = {
        METHOD: 'get',
      }
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        setIsLoading(false)
        setProjects(data.projects)
      } else {
        setIsFailed(true)
      }
    }
    getData()
  }, [url])

  return (
    <div className="detailspage">
      {isLoading ? (
        <div testid="loader">
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        </div>
      ) : !isFailed ? (
        <div className="detailsInner">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
              alt="website logo"
              className="logo"
            />
          </div>
          <form>
            <select value={value} onChange={e => setValue(e.target.value)}>
              {categoriesList.map(each => (
                <option key={each.id} value={each.id}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </form>
          <ul className="projects">
            {projects.map(each => (
              <li key={each.id} className="card">
                <img src={each.image_url} alt={each.name} />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button type="button">Retry</button>
        </div>
      )}
    </div>
  )
}

export default Home
