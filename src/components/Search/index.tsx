'use client'
import style from './style.module.scss'
import SearchIcon from '@/assets/icons/search.svg'
import { useSearchParams, useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react';

export default function Search() {
  const searchParams = useSearchParams()
  const router = useRouter();
  const [order, setOrder] = useState(searchParams.get('order') || '/');
  const [search, setSearch] = useState(searchParams.get('q') || '');

  const orderChangeHandle = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setOrder(value);
    if (value === 'latest') {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set('order', 'latest');
      return router.push(`?${queryParams.toString()}`);
    }
    router.push('/');
  }

  useEffect(() => {
    setOrder(searchParams.get('order') || '/')
  }, [searchParams])

  return (
    <article className={style.container}>
      <div className={style.alignRight}>
        <select
          className={style.orderBox}
          onChange={orderChangeHandle}
          value={order}
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
            const queryParams = new URLSearchParams(window.location.search);
            queryParams.set('q', search);
            router.push(`?${queryParams.toString()}`);

          }} />
        </div>
      </div>
    </article>
  )
}