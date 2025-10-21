import { genreList } from '@/utilities/constants'
import { FaFire } from 'react-icons/fa'

import { motion } from 'framer-motion';
import { Button } from '@/components/forms';

const AnimatedCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 p-4 rounded-lg"
    >
      <h3 className="text-white">Hello Motion!</h3>
    </motion.div>
  );
};


export function ExplorePage() {


  return (
    <div>
      <AnimatedCard />

      <div className="bg-gradient-to-r from-zinc-950 to-zinc-800 text-white p-6 rounded-xl flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">🔥 Discover New Beats</h1>
          <p className="mt-2 text-sm">Fresh tracks curated just for you.</p>
        </div>
        <FaFire className="text-5xl opacity-80" />
      </div>

      <div className="flex gap-4 overflow-x-auto py-2">
        {genreList.map((genre, i) => (
          <Button
            key={genre}
            variant="success"
            size="icon"
            className="rounded-full"
          >
            {i}
          </Button>
        ))}
      </div>

    </div>
  )
}

