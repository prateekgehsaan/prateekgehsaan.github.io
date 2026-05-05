import React, { useState } from 'react';
import { 
  Container, Typography, Box, Grid, Paper, TextField, Button, IconButton, 
  InputAdornment, useTheme, useMediaQuery, Fade, Stack 
} from '@mui/material';
import { Phone, MessageSquare, Send, ChevronRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

/* Icons (same as yours) */
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const Contact = () => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ fullName: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <Box className="relative" id="contact" sx={{ bgcolor: 'white'}}>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/30 via-transparent to-blue-50/30 blur-xl pointer-events-none"></div>

      <Box className="relative py-20 md:py-28 min-h-screen">
        <Container maxWidth="lg">
          <SectionHeader>Get In Touch</SectionHeader>
          <Grid 
            container 
            spacing={{ xs: 6, md: 8 }} 
            alignItems="center"
          >

            {/* LEFT */}
            <Grid item xs={12} md={6}>
              <Fade in timeout={800}>
                <Box className="mb-16">
                   
                  <Typography className="text-slate-600 text-lg md:text-xl mb-16 max-w-md">
                    I'm always open to discussing new opportunities, creative ideas, or ways to bring your vision to life.
                  </Typography>

                  <Stack spacing={5}>

                    {/* Email */}
                    <Paper className="group p-6 md:p-7 rounded-3xl shadow-xl border border-slate-200/50 bg-white/70 backdrop-blur-sm hover:shadow-2xl transition-all">
                      <Box className="flex items-center justify-between">
                        <Box className="flex items-center gap-4">
                          
                          {/* SAME SIZE BOX */}
                          <Box className="w-14 h-14 flex items-center justify-center bg-purple-100 rounded-2xl border border-purple-200">
                            <MailIcon />
                          </Box>

                          <Box>
                            <Typography className="text-sm font-semibold text-slate-500 uppercase">
                              Email
                            </Typography>
                            <Typography className="text-lg font-bold text-slate-900">
                              hi@prateekgupta.dev
                            </Typography>
                          </Box>
                        </Box>

                        <ChevronRight className="text-slate-400" />
                      </Box>
                    </Paper>

                    {/* Phone */}
                    <Paper className="group p-6 md:p-7 rounded-3xl shadow-xl border border-slate-200/50 bg-white/70 backdrop-blur-sm hover:shadow-2xl transition-all">
                      <Box className="flex items-center justify-between">
                        <Box className="flex items-center gap-4">

                          {/* SAME SIZE BOX */}
                          <Box className="w-14 h-14 flex items-center justify-center bg-blue-100 rounded-2xl border border-blue-200">
                            <Phone />
                          </Box>

                          <Box>
                            <Typography className="text-sm font-semibold text-slate-500 uppercase">
                              Call Me
                            </Typography>
                            <Typography className="text-lg font-bold text-slate-900">
                              +91 98765 43210
                            </Typography>
                          </Box>
                        </Box>

                        <ChevronRight className="text-slate-400" />
                      </Box>
                    </Paper>

                  </Stack>
                </Box>
              </Fade>
            </Grid>

            {/* RIGHT FORM */}
            <Grid item xs={12} md={6}>
              <Fade in timeout={1200}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 4, md: 5 },
                    borderRadius: '28px',
                    border: '1px solid rgba(0,0,0,0.08)',
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.08)'
                  }}
                >

                  <Typography variant="h5" fontWeight={800} mb={1}>
                    Send Message
                  </Typography>

                  <Typography color="text.secondary" mb={4}>
                    Tell me more about your project goals...
                  </Typography>

                  <Box component="form" onSubmit={handleSubmit}>

                    <Grid container spacing={2.5}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="fullName"
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MessageSquare size={18} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </Grid>
                    </Grid>

                    <Box mt={2.5}>
                      <TextField fullWidth name="subject" placeholder="Subject" value={formData.subject} onChange={handleInputChange} />
                    </Box>

                    <Box mt={2.5}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleInputChange}
                      />
                    </Box>

                    {/* BUTTON FIX */}
                    <Button
                      type="submit"
                      fullWidth
                      disabled={!formData.fullName || !formData.email || !formData.message}
                      sx={{
                        mt: 4,
                        height: 52,
                        borderRadius: '14px',
                        fontWeight: 700,
                        fontSize: 16,
                        textTransform: 'none',
                        color: '#fff',
                        background: 'linear-gradient(90deg,#7c3aed,#4f46e5)',
                        '&:hover': {
                          background: 'linear-gradient(90deg,#6d28d9,#4338ca)'
                        }
                      }}
                    >
                      <Send size={18} style={{ marginRight: 8 }} />
                      {submitted ? 'Sent Successfully' : 'Send Message'}
                    </Button>

                  </Box>
                </Paper>
              </Fade>
            </Grid>

          </Grid>

        </Container>
      </Box>
    </Box>
  );
};

export default Contact;