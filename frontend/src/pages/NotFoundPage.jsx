import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h1>This page does'n exist... Go <Link to="/">home</Link></h1>
    </div>
  )
}

export {NotFoundPage}
