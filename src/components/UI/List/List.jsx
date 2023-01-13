import PropTypes from 'prop-types';
import classes from './List.module.css';

export default function List({
  className,
  items,
  renderInItem,
  isOrdered,
}) {
  const Tag = isOrdered ? 'ol' : 'ul';

  return (
    <Tag
      className={`${classes.list} ${className}`}
    >
      {items.map((item, index) => (
        <li
          key={typeof item === 'object' ? item.id : `${item}${index}`}
          className={classes.list__item}
        >
          {
            renderInItem
              ? renderInItem(item)
              : item
          }
        </li>
      ))}
    </Tag>
  );
}

List.defaultProps = {
  className: '',
  items: [],
  renderInItem: null,
  isOrdered: false,
};

List.propTypes = {
  className: PropTypes.string,
  renderInItem: PropTypes.func,
  isOrdered: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
    PropTypes.string,
    PropTypes.object,
  ])),
};
