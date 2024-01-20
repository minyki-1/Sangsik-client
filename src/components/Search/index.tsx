'use client'
import style from './style.module.scss'
import SearchIcon from '@/assets/icons/search.svg'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react';

export default function Search() {
  const searchParams = useSearchParams()
  const router = useRouter();
  const [order, setOrder] = useState(searchParams.get('order') || '/');
  const [search, setSearch] = useState('');

  return (
    <article className={style.container}>
      <div className={style.alignRight}>
        <select
          className={style.orderBox}
          onChange={(e) => {
            setOrder(e.target.value);
            if (e.target.value === 'latest') {
              return router.push('?order=latest');
            }
            router.push('/');
          }}
          defaultValue={order}
        >
          <option value="/">인기순</option>
          <option value="latest">최신순</option>
        </select>
        <div className={style.searchWrap}>
          <input
            type="text"
            placeholder='세계에서 가장 높은 산은?'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <SearchIcon onClick={() => {
            router.push(`?q=${encodeURIComponent(search)}`);
          }} />
        </div>
      </div>
    </article>
  )
}