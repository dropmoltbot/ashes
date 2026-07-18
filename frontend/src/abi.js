export const ABI = [
  {"inputs":[{"name":"_beneficiary","type":"address"},{"name":"_timeout","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},
  {"inputs":[],"name":"checkIn","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"fund","outputs":[],"stateMutability":"payable","type":"function"},
  {"inputs":[{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"name":"newBen","type":"address"}],"name":"updateBeneficiary","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"cancel","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"beneficiary","outputs":[{"name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"timeout","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"lastCheckIn","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"balance","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"isDead","outputs":[{"name":"","type":"bool"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"timeRemaining","outputs":[{"name":"","type":"uint256"}],"stateMutability":"view","type":"function"}
]
