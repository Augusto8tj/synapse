'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/personalized-story-creation.ts';
import '@/ai/flows/ai-adaptive-onboarding.ts';
import '@/ai/flows/invention-lab-flow.ts';
import '@/ai/flows/tutor-flow.ts';
