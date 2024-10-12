import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import { Pagination } from 'react-bootstrap';
import './Pages.css';

const Pages = observer(() => {
  const { curtain } = useContext(Context);
  const pageCount = Math.ceil(curtain.totalCount / curtain.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination className="mt-5">
      {pages.map(page => (
        <Pagination.Item
          key={page}
          onClick={() => curtain.setPage(page)}
          className={curtain.page === page ? 'danger' : ''} // Добавьте класс к активной странице
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Pages;
