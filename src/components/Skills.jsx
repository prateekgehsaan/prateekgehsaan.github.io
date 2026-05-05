import React, { useState } from 'react';
import { Container, Typography, Box, Grid, LinearProgress, Paper, Stack, Modal, IconButton } from '@mui/material';
import { Code2, Layout, Database, Wrench, GraduationCap, Award, X, ChevronRight, BarChart3 } from 'lucide-react';
import SectionHeader from './SectionHeader';
// --- Universal Detail Panel Component ---
const DetailPanel = ({ open, handleClose, data, type }) => {
  if (!data) return null;

  return (
    <Modal open={open} onClose={handleClose} className="flex items-center justify-center p-4">
      <Paper className="w-full max-w-lg bg-white rounded-[32px] overflow-hidden outline-none shadow-2xl animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <Box className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <Box className="flex items-center gap-3">
            <Box className="p-2 bg-indigo-600 text-white rounded-xl shadow-md">
              {type === 'skills' ? data.icon : <BarChart3 size={24} />}
            </Box>
            <Typography variant="h6" className="font-black text-slate-900 uppercase tracking-tight">
              {type === 'skills' ? `Full ${data.title} Stack` : 'Detailed Expertise'}
            </Typography>
          </Box>
          <IconButton onClick={handleClose} className="text-slate-400 hover:text-red-500 transition-colors">
            <X size={24} />
          </IconButton>
        </Box>

        {/* Body */}
        <Box className="p-8 max-h-[70vh] overflow-y-auto">
          {type === 'skills' ? (
            <Box className="flex flex-wrap gap-3">
              {data.items.map((item, i) => (
                <Box key={i} className="px-5 py-3 bg-indigo-50 border border-indigo-100 rounded-2xl text-base font-bold text-indigo-700 shadow-sm">
                  {item}
                </Box>
              ))}
            </Box>
          ) : (
            <Stack spacing={4}>
              {data.map((exp, idx) => (
                <Box key={idx}>
                  <Box className="flex justify-between items-center mb-2">
                    <Typography className="font-bold text-slate-600 text-sm uppercase">{exp.label}</Typography>
                    <Typography className="font-black text-indigo-600">{exp.value}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={exp.value} className="h-2 rounded-full bg-slate-100" sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#4f46e5' } }} />
                </Box>
              ))}
            </Stack>
          )}
        </Box>
      </Paper>
    </Modal>
  );
};

const Skills = () => {
  const [panelData, setPanelData] = useState({ open: false, data: null, type: '' });

  const skillGroups = [
    { title: "Languages", icon: <Code2 size={24} />, items: ["JavaScript", "TypeScript", "Python", "Go", "SQL", "Rust", "C#", "Swift"] },
    { title: "Frameworks", icon: <Layout size={24} />, items: ["React", "Next.js", "Node.js", "Express", "Tailwind", "MUI", "Redux"] },
    { title: "Databases", icon: <Database size={24} />, items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch"] },
    { title: "Tools", icon: <Wrench size={24} />, items: ["Docker", "Kubernetes", "Git", "AWS", "CI/CD", "Terraform"] }
  ];

  const expertise = [
    { label: "JavaScript/TypeScript", value: 95 },
    { label: "React Ecosystem", value: 92 },
    { label: "Backend Architecture", value: 88 },
    { label: "Cloud & DevOps", value: 80 },
    { label: "System Design", value: 85 },
    { label: "API Security", value: 90 }
  ];

  const handleOpen = (data, type) => setPanelData({ open: true, data, type });
  const handleClose = () => setPanelData({ ...panelData, open: false });

  return (
    <Box id="skills" component="section" className="py-24 bg-white">
      <Container maxWidth="lg">
        <SectionHeader>Skills & Expertise</SectionHeader>

        <Grid container spacing={10}>
          {/* LEFT: Skills Categories */}
          <Grid item xs={12} lg={6}>
            <Stack spacing={2}>
              {skillGroups.map((group, idx) => {
                const isTruncated = group.items.length > 5;
                return (
                  <Paper key={idx} elevation={0} className="p-5 border border-slate-100 bg-slate-50/40 rounded-[32px]">
                    <Box className="flex justify-between items-center mb-6">
                      <Box className="flex items-center gap-4">
                        <Box className="p-2 bg-white text-indigo-600 rounded-2xl shadow-sm border border-slate-100">{group.icon}</Box>
                        <Typography className="font-bold text-slate-800 uppercase text-xs tracking-widest">{group.title}</Typography>
                      </Box>
                      {isTruncated && (
                        <button onClick={() => handleOpen(group, 'skills')} className="text-indigo-600 font-black text-xs uppercase hover:underline flex items-center gap-1">
                          View {group.items.length - 5} More <ChevronRight size={14} />
                        </button>
                      )}
                    </Box>
                    <Box className="flex flex-wrap gap-2">
                      {group.items.slice(0, 5).map((item, i) => (
                        <Box key={i} className="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-base font-bold text-slate-700 shadow-sm">{item}</Box>
                      ))}
                    </Box>
                  </Paper>
                );
              })}
            </Stack>
          </Grid>

          {/* RIGHT: Expertise & Achievements */}
          <Grid item xs={12} lg={6}>
            <Stack spacing={6}>
              <Box>
                <Box className="flex justify-between items-center mb-8">
                  <Typography variant="h5" className="font-black text-slate-900 uppercase tracking-widest text-lg">Expertise Level</Typography>
                  {expertise.length > 4 && (
                    <button onClick={() => handleOpen(expertise, 'expertise')} className="text-indigo-600 font-black text-xs uppercase hover:underline flex items-center gap-1">
                      Full Breakdown <ChevronRight size={14} />
                    </button>
                  )}
                </Box>
                <Stack spacing={5}>
                  {expertise.slice(0, 4).map((exp, idx) => (
                    <Box key={idx}>
                      <Box className="flex justify-between items-center mb-3">
                        <Typography className="font-bold text-slate-500 text-sm uppercase tracking-wider">{exp.label}</Typography>
                        <Typography className="font-black text-indigo-600 text-xl">{exp.value}%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={exp.value} className="h-3 rounded-full bg-slate-100"
                        sx={{ '& .MuiLinearProgress-bar': { background: 'linear-gradient(90deg, #4f46e5, #818cf8)', borderRadius: '9999px' } }} />
                    </Box>
                  ))}
                </Stack>
              </Box>

              <Box className="space-y-4">
                <Paper elevation={0} className="p-8 border border-slate-100 bg-orange-50/30 rounded-[32px] flex items-center gap-6">
                  <Box className="p-4 bg-white text-orange-600 rounded-2xl shadow-sm"><GraduationCap size={32} /></Box>
                  <Box><Typography variant="caption" className="font-black text-orange-400 uppercase tracking-widest">Education</Typography><Typography variant="h5" className="font-black text-slate-900">B.Sc Computer Science</Typography></Box>
                </Paper>
                <Paper elevation={0} className="p-8 border border-slate-100 bg-blue-50/30 rounded-[32px] flex items-center gap-6">
                  <Box className="p-4 bg-white text-blue-600 rounded-2xl shadow-sm"><Award size={32} /></Box>
                  <Box><Typography variant="caption" className="font-black text-blue-400 uppercase tracking-widest">Certifications</Typography><Typography variant="h5" className="font-black text-slate-900">AWS Solutions Architect</Typography></Box>
                </Paper>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <DetailPanel open={panelData.open} handleClose={handleClose} data={panelData.data} type={panelData.type} />
      </Container>
    </Box>
  );
};

export default Skills;