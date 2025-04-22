// import React, { useState } from 'react'
import { categories } from '@/data'

export function HomePage() {

 // const [loading, setLoading] = useState(false)

  return (
    <div className="grid gap-4">
      {Object.entries(categories).map((cat) => <div className="grid gap-4">
        <div className="text-lg font-semibold">
          {cat[0].toUpperCase()}
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {/* {JSON.stringify(cat[1])} */}

          {cat[1].map((item) =>
            <div key={item.title} className="block">
              <img src="http://cdn-images.dzcdn.net/images/cover/1a2ff1ad7241739d524583d6f775c379/1000x1000-000000-80-0-0.jpg" className="size-60" />


            </div>)}
        </div>
      </div>)}
    </div>
  )
}
