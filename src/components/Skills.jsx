import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Paper, Stack, Modal, IconButton } from '@mui/material';
import {
  Code2, Layout, Database, Wrench, GraduationCap, Award, X, ChevronRight,
  Sparkles, Palette, Server, CheckCircle2, TrendingUp
} from 'lucide-react';
import profileData from '../data/profile.json';
import SectionHeader from './SectionHeader';

const ICONS = {
  code: Code2,
  layout: Layout,
  database: Database,
  wrench: Wrench,
  sparkles: Sparkles,
  palette: Palette,
  server: Server,
  check: CheckCircle2
};

const GroupIcon = ({ name }) => {
  const Icon = ICONS[name] || Code2;
  return <Icon size={24} />;
};

const SkillsModal = ({ group, onClose }) => {
  if (!group) return null;
  return (
    <Modal open={Boolean(group)} onClose={onClose} className="flex items-center justify-center p-4">
      <Paper className="w-full max-w-lg bg-white rounded-[32px] overflow-hidden outline-none shadow-2xl">
        <Box className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <Box className="flex items-center gap-3">
            <Box className="p-2 bg-indigo-600 text-white rounded-xl shadow-md"><GroupIcon name={group.icon} /></Box>
            <Typography variant="h6" className="font-black text-slate-900 uppercase tracking-tight">{group.title}</Typography>
          </Box>
          <IconButton onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors" aria-label="Close">
            <X size={24} />
          </IconButton>
        </Box>
        <Box className="p-8 max-h-[70vh] overflow-y-auto">
          <Box className="flex flex-wrap gap-3">
            {group.items.map((item, i) => (
              <Box key={i} className="px-5 py-3 bg-indigo-50 border border-indigo-100 rounded-2xl text-base font-bold text-indigo-700 shadow-sm">
                {item}
              </Box>
            ))}
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

const Skills = () => {
  const [openGroup, setOpenGroup] = useState(null);
  const skillGroups = profileData.skills || [];
  const impact = profileData.impact || [];
  const education = profileData.education || [];
  const certifications = profileData.certifications || [];

  return (
    <Box id="skills" component="section" className="py-24 bg-white">
      <Container maxWidth="lg">
        <SectionHeader>Skills & Expertise</SectionHeader>

        <Grid container spacing={6}>
          {/* LEFT: Skill groups */}
          <Grid item xs={12} lg={6}>
            <Stack spacing={2}>
              {skillGroups.map((group, idx) => {
                const isTruncated = group.items.length > 5;
                return (
                  <Paper key={idx} elevation={0} className="p-5 border border-slate-100 bg-slate-50/40 rounded-[32px]">
                    <Box className="flex justify-between items-center mb-4">
                      <Box className="flex items-center gap-4">
                        <Box className="p-2 bg-white text-indigo-600 rounded-2xl shadow-sm border border-slate-100"><GroupIcon name={group.icon} /></Box>
                        <Typography className="font-bold text-slate-800 uppercase text-xs tracking-widest">{group.title}</Typography>
                      </Box>
                      {isTruncated && (
                        <button onClick={() => setOpenGroup(group)} className="text-indigo-600 font-black text-xs uppercase hover:underline flex items-center gap-1">
                          View {group.items.length - 5} More <ChevronRight size={14} />
                        </button>
                      )}
                    </Box>
                    <Box className="flex flex-wrap gap-2">
                      {group.items.slice(0, 5).map((item, i) => (
                        <Box key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 shadow-sm">{item}</Box>
                      ))}
                    </Box>
                  </Paper>
                );
              })}
            </Stack>
          </Grid>

          {/* RIGHT: Impact, education, certifications */}
          <Grid item xs={12} lg={6}>
            <Stack spacing={5}>
              <Box>
                <Box className="flex items-center gap-3 mb-6">
                  <TrendingUp size={22} className="text-indigo-600" />
                  <Typography variant="h5" className="font-black text-slate-900 uppercase tracking-widest text-lg">Impact Highlights</Typography>
                </Box>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  {impact.map((item, idx) => (
                    <Paper key={idx} elevation={0} className="p-5 border border-slate-100 rounded-[24px] bg-indigo-50/40">
                      <Typography className="font-black text-indigo-600" sx={{ fontSize: 28 }}>{item.value}</Typography>
                      <Typography className="font-bold text-slate-800" sx={{ fontSize: 15 }}>{item.label}</Typography>
                      <Typography className="text-slate-500" sx={{ fontSize: 13 }}>{item.detail}</Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>

              <Paper elevation={0} className="p-6 border border-slate-100 bg-orange-50/30 rounded-[32px]">
                <Box className="flex items-center gap-4 mb-4">
                  <Box className="p-3 bg-white text-orange-600 rounded-2xl shadow-sm"><GraduationCap size={28} /></Box>
                  <Typography variant="caption" className="font-black text-orange-400 uppercase tracking-widest">Education</Typography>
                </Box>
                <Stack spacing={2}>
                  {education.map((ed, idx) => (
                    <Box key={idx}>
                      <Typography className="font-black text-slate-900" sx={{ fontSize: 17 }}>{ed.degree}</Typography>
                      <Typography className="text-slate-500" sx={{ fontSize: 14 }}>{ed.school} · {ed.years}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>

              {certifications.length > 0 && (
                <Paper elevation={0} className="p-6 border border-slate-100 bg-blue-50/30 rounded-[32px] flex items-center gap-5">
                  <Box className="p-3 bg-white text-blue-600 rounded-2xl shadow-sm"><Award size={28} /></Box>
                  <Box>
                    <Typography variant="caption" className="font-black text-blue-400 uppercase tracking-widest">Certifications</Typography>
                    {certifications.map((c, idx) => (
                      <Typography key={idx} className="font-black text-slate-900" sx={{ fontSize: 17 }}>{c.name}</Typography>
                    ))}
                  </Box>
                </Paper>
              )}
            </Stack>
          </Grid>
        </Grid>

        <SkillsModal group={openGroup} onClose={() => setOpenGroup(null)} />
      </Container>
    </Box>
  );
};

export default Skills;
