import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './genre-view.scss';

export class GenreView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if (!genre) return null;

    return (
      <div className="genreview">
        <Card>
          <Card.Body>
            <Card.Text>
              Genre:
              {genre.Name}
            </Card.Text>
            <Card.Text>
              Description:
              {genre.Description}
            </Card.Text>
            <Button type="button" variant="link" size="sm" onClick={() => history.back()}>
              Back
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string,
  }).isRequired,
};
