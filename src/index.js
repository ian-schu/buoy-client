import './style/global';
import App from './components/app';

export default App;

if (typeof window !== 'undefined') {
	document.querySelector('html').classList.add('has-navbar-fixed-top');
}