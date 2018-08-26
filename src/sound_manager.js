"use strict";
class SoundManager
{
    constructor()
    {
        this.soundQueue = []
        this.mute = false;

        this.whiteNoise = new p5.Noise('white');
        this.whiteNoise.amp(0);
        this.whiteNoise.start();

        this.brownNoise = new p5.Noise('brown');
        this.brownNoise.amp(0);
        this.brownNoise.start();

        this.asteroidBreakEnvelope = new p5.Env();
        this.asteroidBreakEnvelope.setADSR(0.005, 0.07, 1, 0.005);

        this.explosionEnvelope = new p5.Env();
        this.explosionEnvelope.setADSR(0.001,1, 0.7, 1);

        this.raygunOscillator = new p5.Oscillator();
        this.raygunOscillator.setType('sawtooth');
        this.raygunOscillator.freq(600);
        this.raygunOscillator.amp(0);
        this.raygunOscillator.start();

        this.raygunEnvelope = new p5.Env();
        this.raygunEnvelope.setADSR(0.001, 0.02, 0.05, 0.05);
    }

    queueSound(sound)
    {
        this.soundQueue.push(sound);
    }

    playAllQueuedSounds()
    {
        if(this.mute)
        {
            this.soundQueue = []; //clear queue
        }
        else
        {
            var previousSound = '';
            while(this.soundQueue.length > 0)
            {
                var currentSound = this.soundQueue.pop()
                //cheap trick to try to avoid repeating sounds
                if(previousSound==currentSound)
                {
                    continue;
                }
                this.playSound(currentSound);
                previousSound = currentSound;
            }
        }
    }
    
    playSound(sound)
    {
        switch(sound) 
        {
        case 'proton_bolt':
            this.raygunEnvelope.play(this.raygunOscillator);    
            break;
        case 'asteroid_break':
            this.asteroidBreakEnvelope.play(this.brownNoise);
            break;
        default:
            console.log('Sound not found:'+sound);
        }
    }

    mute()
    {
        this.mute = true;
    }

    unmute()
    {
        this.mute = false;
    }
}

