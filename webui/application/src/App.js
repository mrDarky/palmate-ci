import './styles.scss';

import { render } from 'react-dom';

import Router from './Router';
import './stores/ProjectsStore';

render(Router, document.getElementById('app'));
