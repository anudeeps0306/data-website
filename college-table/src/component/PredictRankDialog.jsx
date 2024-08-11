import { useState } from 'react';
import {
  Button, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, CircularProgress, Box
} from '@mui/material';

const PredictRankDialog = ({ open, onClose }) => {
  const [score, setScore] = useState('');
  const [loading, setLoading] = useState(false);
  const [predictedRank, setPredictedRank] = useState(null);

  const handleSubmit = () => {
    setLoading(true);
    fetch('https://data-backend-ra9x.onrender.com/predict-rank', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ score: parseFloat(score) }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPredictedRank(data.predicted_rank);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Predict 2024 Rank</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Enter Your Score"
            type="number"
            fullWidth
            variant="outlined"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
              <CircularProgress />
            </Box>
          ) : (
            predictedRank !== null && (
              <Box mt={2}>
                <h3>Predicted Rank: {predictedRank}</h3>
              </Box>
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PredictRankDialog;
