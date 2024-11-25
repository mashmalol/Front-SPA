'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Wallet2, Home, Compass, User, MessageSquare, Package, Coins, PlusSquare, X } from 'lucide-react'

function PixelatedText({ children, className = "" }) {
  return (
    <div className={`pixel-text ${className}`}>
      {children}
      <style jsx>{`
        .pixel-text {
          font-family: 'Press Start 2P', cursive;
          text-shadow: 2px 2px 0px #ff00ff, -2px -2px 0px #00ffff;
          letter-spacing: 2px;
        }
      `}</style>
    </div>
  )
}

function ArcadeButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`arcade-btn ${className}`}
    >
      {children}
      <style jsx>{`
        .arcade-btn {
          background: linear-gradient(45deg, #ff00ff, #00ffff);
          border: none;
          padding: 10px 20px;
          color: #ffffff;
          font-family: 'Press Start 2P', cursive;
          font-size: 14px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .arcade-btn:before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 20px,
            rgba(255, 255, 255, 0.25) 20px,
            rgba(255, 255, 255, 0.25) 40px
          );
          animation: glitch 5s infinite linear;
          opacity: 0.3;
        }
        .arcade-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px #ff00ff, 0 0 15px #00ffff;
        }
        @keyframes glitch {
          0% {
            transform: translateX(-50%) translateY(-50%) rotate(0deg);
          }
          100% {
            transform: translateX(-50%) translateY(-50%) rotate(360deg);
          }
        }
      `}</style>
    </button>
  )
}

function DigitalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const columns = canvas.width / 20
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    function draw() {
      ctx.fillStyle = 'rgba(26, 9, 45, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#f7ea5c'
      ctx.font = '15px "Press Start 2P"'

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(Math.random() * 128)
        ctx.fillText(text, i * 20, drops[i] * 20)

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    return () => clearInterval(interval)
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />
}

function Grid() {
  const { scene } = useThree()
  const gridRef = useRef<THREE.GridHelper>()

  useEffect(() => {
    const size = 20
    const divisions = 20
    const gridHelper = new THREE.GridHelper(size, divisions, 0xf7ea5c, 0x5e9bff)
    gridRef.current = gridHelper
    scene.add(gridHelper)

    return () => {
      scene.remove(gridHelper)
    }
  }, [scene])

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.getElapsedTime() * 0.5) % 1
    }
  })

  return null
}

function Popup({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-[#0c0517] border-2 border-[#f7ea5c] p-6 rounded-lg max-w-3xl max-h-[80vh] overflow-auto">
        <button onClick={onClose} className="absolute top-2 right-2 text-[#f7ea5c] hover:text-[#ff00ff]">
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  )
}

function ExplorePage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Explore the Starry Night</h2>
      <p>Welcome to the vast cosmic marketplace. Discover digital masterpieces and rare collectibles.</p>
      {/* Add more content for the explore page */}
    </div>
  )
}

function RetroChatRooms() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Retro Chat Rooms</h2>
      <p>Connect with other dreamers in our starry chat rooms.</p>
      {/* Add chat room functionality */}
    </div>
  )
}

function UserProfile() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">User Profile</h2>
      <p>View and edit your cosmic profile.</p>
      {/* Add user profile information and editing functionality */}
    </div>
  )
}

function VendingMachine() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Vending Machine</h2>
      <p>Purchase digital goods and NFTs with cosmic currency.</p>
      {/* Add vending machine functionality */}
    </div>
  )
}

function RetroSlotMachine() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Retro Slot Machine</h2>
      <p>Try your luck in the starry casino!</p>
      {/* Add slot machine game functionality */}
    </div>
  )
}

function MintNFTPopup() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Mint NFT</h2>
      <p>Create your own unique NFT and add it to the cosmic blockchain.</p>
      {/* Add NFT minting functionality */}
    </div>
  )
}

export function BlockPage() {
  const [activePopup, setActivePopup] = useState(null)
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        setIsWalletConnected(true)
      } catch (error) {
        console.error("Failed to connect wallet:", error)
      }
    } else {
      alert("Please install MetaMask!")
    }
  }

  const closePopup = () => setActivePopup(null)

  return (
    <div className="min-h-screen bg-[#1a092d] text-[#f7ea5c] font-['Press Start 2P', monospace]">
      <DigitalRain />
      <div className="fixed inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 5, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Grid />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>
      <div className="relative z-20">
        <header className="bg-[#0c0517] border-b-4 border-[#f7ea5c] p-4">
          <div className="container mx-auto flex justify-between items-center">
            <PixelatedText className="text-4xl font-bold">CryptoChan</PixelatedText>
            <nav className="flex items-center space-x-4">
              <ArcadeButton onClick={() => setActivePopup('explore')}>
                <Compass className="mr-2 h-4 w-4" />
                Explore
              </ArcadeButton>
              <ArcadeButton onClick={() => setActivePopup('profile')}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </ArcadeButton>
              <ArcadeButton
                onClick={connectWallet}
                className={isWalletConnected ? 'connected' : ''}
              >
                <Wallet2 className="mr-2 h-4 w-4" />
                {isWalletConnected ? 'Connected' : 'Connect Wallet'}
              </ArcadeButton>
            </nav>
          </div>
        </header>

        <main className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-[#0c0517] border-2 border-[#f7ea5c] text-[#f7ea5c] arcade-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2" />
                  <PixelatedText>Chat Rooms</PixelatedText>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-['Press Start 2P'] text-xs">Enter the starry chat rooms and connect with other dreamers.</p>
              </CardContent>
              <CardFooter>
                <ArcadeButton onClick={() => setActivePopup('chat')} className="w-full">
                  Enter Chat
                </ArcadeButton>
              </CardFooter>
            </Card>
            <Card className="bg-[#0c0517] border-2 border-[#f7ea5c] text-[#f7ea5c] arcade-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2" />
                  <PixelatedText>Vending Machine</PixelatedText>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-['Press Start 2P'] text-xs">Purchase digital goods and NFTs with cosmic currency.</p>
              </CardContent>
              <CardFooter>
                <ArcadeButton onClick={() => setActivePopup('vending')} className="w-full">
                  Open Vending Machine
                </ArcadeButton>
              </CardFooter>
            </Card>
            <Card className="bg-[#0c0517] border-2 border-[#f7ea5c] text-[#f7ea5c] arcade-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coins className="mr-2" />
                  <PixelatedText>Slot Machine</PixelatedText>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-['Press Start 2P'] text-xs">Try your luck in the starry casino with our cosmic slot machine.</p>
              </CardContent>
              <CardFooter>
                <ArcadeButton onClick={() => setActivePopup('slots')} className="w-full">
                  Play Slots
                </ArcadeButton>
              </CardFooter>
            </Card>
            <Card className="bg-[#0c0517] border-2 border-[#f7ea5c] text-[#f7ea5c] arcade-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PlusSquare className="mr-2" />
                  <PixelatedText>Mint NFT</PixelatedText>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-['Press Start 2P'] text-xs">Create your own unique NFT and add it to the cosmic blockchain.</p>
              </CardContent>
              <CardFooter>
                <ArcadeButton onClick={() => setActivePopup('mint')} className="w-full">
                  Mint NFT
                </ArcadeButton>
              </CardFooter>
            </Card>
            <Card className="md:col-span-2 bg-[#0c0517] border-2 border-[#f7ea5c] text-[#f7ea5c] arcade-card">
              <CardHeader>
                <CardTitle className="text-2xl">
                  <PixelatedText>Enter the Starry Night</PixelatedText>
                </CardTitle>
                <CardDescription className="font-['Press Start 2P'] text-xs">Explore the vast cosmic marketplace</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-['Press Start 2P'] text-xs">Dive into a world of digital masterpieces, rare collectibles, and surreal experiences.</p>
              </CardContent>
              <CardFooter>
                <ArcadeButton onClick={() => setActivePopup('explore')} className="w-full text-lg">
                  Enter the Starry Night
                </ArcadeButton>
              </CardFooter>
            </Card>
          </div>
        </main>

        <AnimatePresence>
          {activePopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Popup onClose={closePopup}>
                {activePopup === 'explore' && <ExplorePage />}
                {activePopup === 'chat' && <RetroChatRooms />}
                {activePopup === 'profile' && <UserProfile />}
                {activePopup === 'vending' && <VendingMachine />}
                {activePopup === 'slots' && <RetroSlotMachine />}
                {activePopup === 'mint' && <MintNFTPopup />}
              </Popup>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="fixed bottom-0 left-0 right-0 bg-[#0c0517] border-t-4 border-[#f7ea5c] p-4">
          <div className="container mx-auto flex justify-between items-center">
            <PixelatedText className="text-sm">&copy; 2077 CryptoChan</PixelatedText>
            <PixelatedText className="text-sm">{new Date().toLocaleTimeString()}</PixelatedText>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          background-color: #1a092d;
          color: #f7ea5c;
          font-family: 'Press Start 2P', cursive;
        }

        .arcade-card {
          box-shadow: 0 0 10px #ff00ff, 0 0 20px #00ffff;
          transition: all 0.3s ease;
        }

        .arcade-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 20px #ff00ff, 0 0 40px #00ffff;
        }

        @keyframes neon-glow {
          0% {
            text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff, 0 0 20px #ff00ff;
          }
          50% {
            text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff, 0 0 40px #00ffff;
          }
          100% {
            text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff, 0 0 20px #ff00ff;
          }
        }

        .neon-text {
          animation: neon-glow 2s infinite alternate;
        }
      `}</style>
    </div>
  )
}