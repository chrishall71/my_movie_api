import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;

    return (
      <div className="directorview">
        <Card>
          <Card.Body>
            <Card.Text>
              Director:
              {director.Name}
            </Card.Text>
            <Card.Text>
              Bio:
              {director.Bio}
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

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Brith: PropTypes.string,
    Death: PropTypes.string,
  }).isRequired,
};
