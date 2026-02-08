import { shubhashitas } from '../../lib/shubhashitas';

export default function handler(req, res) {
  res.status(200).json(shubhashitas);
}
