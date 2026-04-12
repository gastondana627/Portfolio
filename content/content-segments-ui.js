// Content Segments UI Component
// Simplified interface for browsing and displaying segment content

class ContentSegmentsUI {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentSegment = null;
        this.currentView = 'grid'; // 'grid' or 'detail'
        this.init();
    }

    init() {
        if (!this.container) {
            console.error('Segments container not found');
            return;
        }
        this.renderSegmentNavigation();
        this.renderSegmentGrid();
    }

    // Render segment navigation tabs
    renderSegmentNavigation() {
        const activeSegments = SegmentHelpers.getActiveSegments();
        
        const nav = document.createElement('div');
        nav.className = 'segments-navigation';
        nav.innerHTML = `
            <div class="segments-nav-container">
                <button class="segment-nav-btn active" data-segment="all">
                    <i class="fas fa-th"></i> All Segments
                </button>
                ${activeSegments.map(segment => `
                    <button class="segment-nav-btn" data-segment="${segment.id}">
                        <i class="fas ${this.getSegmentIcon(segment.type)}"></i> ${segment.title}
                    </button>
                `).join('')}
            </div>
        `;

        this.container.appendChild(nav);

        // Add click handlers
        nav.querySelectorAll('.segment-nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                nav.querySelectorAll('.segment-nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const segmentId = btn.dataset.segment;
                this.filterBySegment(segmentId);
            });
        });
    }

    // Render segment items in grid view
    renderSegmentGrid(segmentId = null) {
        const gridContainer = document.createElement('div');
        gridContainer.className = 'segments-grid-container';
        gridContainer.id = 'segments-grid';

        let itemsToDisplay = [];
        
        if (segmentId && segmentId !== 'all') {
            const segment = SegmentHelpers.getSegmentById(segmentId);
            if (segment) {
                itemsToDisplay = segment.items.map(item => ({
                    ...item,
                    segmentId: segment.id,
                    segmentTitle: segment.title,
                    segmentType: segment.type
                }));
            }
        } else {
            // Show all items from all segments
            Object.values(ContentSegmentsData).forEach(segment => {
                if (segment.active && segment.items) {
                    segment.items.forEach(item => {
                        itemsToDisplay.push({
                            ...item,
                            segmentId: segment.id,
                            segmentTitle: segment.title,
                            segmentType: segment.type
                        });
                    });
                }
            });
        }

        gridContainer.innerHTML = `
            <div class="segments-grid">
                ${itemsToDisplay.map(item => this.renderGridItem(item)).join('')}
            </div>
        `;

        // Replace existing grid or append
        const existingGrid = document.getElementById('segments-grid');
        if (existingGrid) {
            existingGrid.replaceWith(gridContainer);
        } else {
            this.container.appendChild(gridContainer);
        }

        // Add click handlers for items
        gridContainer.querySelectorAll('.segment-item').forEach(itemEl => {
            itemEl.addEventListener('click', () => {
                const itemId = itemEl.dataset.itemId;
                this.showItemDetail(itemId);
            });
        });
    }

    // Render individual grid item
    renderGridItem(item) {
        const thumbnail = item.thumbnailPath || (item.images && item.images[0]) || 'assets/images/placeholder.jpg';
        const isVideo = item.videoPath || item.segmentType === 'video-gallery';
        
        return `
            <div class="segment-item" data-item-id="${item.id}">
                <div class="segment-item-thumbnail">
                    <img src="${thumbnail}" alt="${item.title}" loading="lazy">
                    ${isVideo ? '<div class="video-overlay"></div>' : ''}
                </div>
                <div class="segment-item-info">
                    <span class="segment-badge">${item.segmentTitle}</span>
                    <h3 class="segment-item-title">${item.title}</h3>
                    <p class="segment-item-description">${item.description || ''}</p>
                    ${item.duration ? `<span class="segment-duration"><i class="fas fa-clock"></i> ${item.duration}</span>` : ''}
                    ${item.month ? `<span class="segment-date"><i class="fas fa-calendar"></i> ${item.month} ${item.year}</span>` : ''}
                </div>
            </div>
        `;
    }

    // Show detailed view of an item
    showItemDetail(itemId) {
        const result = SegmentHelpers.getItemById(itemId);
        if (!result) return;

        const { segment, item } = result;
        const segmentData = SegmentHelpers.getSegmentById(segment);
        
        const modal = document.createElement('div');
        modal.className = 'segment-detail-modal';
        modal.innerHTML = `
            <div class="segment-detail-overlay"></div>
            <div class="segment-detail-content">
                <button class="segment-detail-close">
                    <i class="fas fa-times"></i>
                </button>
                <div class="segment-detail-body">
                    ${this.renderItemDetail(item, segmentData)}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // --- Add interactive listeners ---
        
        // Video play button listener
        const videoThumb = modal.querySelector(`#video-thumb-${item.id}`);
        if (videoThumb) {
            videoThumb.addEventListener('click', () => {
                const playerContainer = modal.querySelector(`#video-player-${item.id}`);
                const videoElement = playerContainer.querySelector('video');

                // Set up error handler for video
                // For video with source tags, we need to check the last source
                const sources = videoElement.querySelectorAll('source');
                const lastSource = sources[sources.length - 1];

                const handleVideoError = (e) => {
                    console.error('Video failed to load:', item.videoPath, e);
                    playerContainer.innerHTML = `
                        <div class="video-error-message">
                            <i class="fas fa-exclamation-triangle"></i>
                            <p>This video file was not included in the production build due to size constraints.</p>
                            <small>Path: ${item.videoPath}</small>
                        </div>
                    `;
                };

                // Better error handling for LFS pointers
                const checkLFS = async () => {
                    try {
                        const response = await fetch(item.videoPath, { method: 'HEAD' });
                        const size = response.headers.get('content-length');
                        // LFS pointers are usually very small (around 130-200 bytes)
                        if (size && parseInt(size) < 1000) {
                            console.warn('LFS pointer detected for video:', item.videoPath);
                            handleVideoError();
                            return true;
                        }
                    } catch (e) {
                        console.error('Error checking video size:', e);
                    }
                    return false;
                };

                if (lastSource) {
                    lastSource.addEventListener('error', handleVideoError);
                }
                videoElement.addEventListener('error', handleVideoError);

                videoThumb.style.display = 'none';
                playerContainer.style.display = 'block';

                checkLFS().then(isLFS => {
                    if (!isLFS) {
                        const playPromise = videoElement.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(error => {
                                console.error('Playback failed:', error);
                                // Check if it's already showing error message
                                if (!playerContainer.querySelector('.video-error-message')) {
                                    handleVideoError(error);
                                }
                            });
                        }
                    }
                });
            });
        }
        
        // Carousel listeners
        const track = modal.querySelector(`#carousel-track-${item.id}`);
        if (track) {
            let currentIndex = 0;
            const slides = track.querySelectorAll('.carousel-slide');
            const dots = modal.querySelectorAll('.carousel-dot');
            const prevBtn = modal.querySelector('.prev-btn');
            const nextBtn = modal.querySelector('.next-btn');

            const updateCarousel = (index) => {
                slides.forEach((s, i) => s.classList.toggle('active', i === index));
                dots.forEach((d, i) => d.classList.toggle('active', i === index));
                currentIndex = index;
            };

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
                    updateCarousel(newIndex);
                });
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
                    updateCarousel(newIndex);
                });
            }
            dots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    updateCarousel(parseInt(e.target.dataset.index));
                });
            });
        }

        // Close modal function
        const closeModal = () => {
            document.body.style.overflow = '';
            modal.remove();
        };

        // Close handlers
        modal.querySelector('.segment-detail-close').addEventListener('click', closeModal);
        modal.querySelector('.segment-detail-overlay').addEventListener('click', closeModal);
        
        // ESC key to close
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    // Render detailed item view
    renderItemDetail(item, segment) {
        if (item.videoPath) {
            return `
                <div class="segment-detail-video-container">
                    <div class="segment-video-thumbnail" id="video-thumb-${item.id}">
                        <img src="${item.thumbnailPath}" alt="${item.title}" onerror="this.src='assets/images/placeholder.jpg'">
                        <div class="play-button-overlay">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="segment-video-player" id="video-player-${item.id}" style="display: none;">
                        <video controls>
                            <source src="${item.videoPath}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
                <div class="segment-detail-info">
                    <span class="segment-badge">${segment.title}</span>
                    <h2>${item.title}</h2>
                    ${item.series ? `<p class="segment-series"><strong>Series:</strong> ${item.series}</p>` : ''}
                    ${item.duration ? `<p class="segment-duration"><i class="fas fa-clock"></i> ${item.duration}</p>` : ''}
                    <p class="segment-description">${item.description}</p>
                </div>
            `;
        } else if (item.images) {
            return `
                <div class="segment-detail-carousel">
                    <div class="carousel-track" id="carousel-track-${item.id}">
                        ${item.images.map((img, index) => `
                            <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                                <img src="${img}" alt="${item.title} - Image ${index + 1}" loading="lazy">
                            </div>
                        `).join('')}
                    </div>
                    ${item.images.length > 1 ? `
                    <button class="carousel-btn prev-btn" data-target="carousel-track-${item.id}"><i class="fas fa-chevron-left"></i></button>
                    <button class="carousel-btn next-btn" data-target="carousel-track-${item.id}"><i class="fas fa-chevron-right"></i></button>
                    <div class="carousel-dots">
                        ${item.images.map((_, index) => `
                            <div class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
                        `).join('')}
                    </div>
                    ` : ''}
                </div>
                <div class="segment-detail-info">
                    <span class="segment-badge">${segment.title}</span>
                    <h2>${item.title}</h2>
                    ${item.period ? `<p class="segment-period"><i class="fas fa-calendar"></i> ${item.period}</p>` : ''}
                    ${item.month ? `<p class="segment-date"><i class="fas fa-calendar"></i> ${item.month} ${item.year}</p>` : ''}
                    ${item.prompt ? `<p class="segment-prompt"><strong>Prompt:</strong> ${item.prompt}</p>` : ''}
                    <p class="segment-description">${item.description}</p>
                </div>
            `;
        }
    }

    // Filter segments
    filterBySegment(segmentId) {
        this.currentSegment = segmentId === 'all' ? null : segmentId;
        this.renderSegmentGrid(this.currentSegment);
    }

    // Get icon for segment type
    getSegmentIcon(type) {
        const icons = {
            'video-gallery': 'fa-video',
            'image-gallery': 'fa-images',
            'podcast': 'fa-podcast',
            'article': 'fa-newspaper'
        };
        return icons[type] || 'fa-folder';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const segmentsContainer = document.getElementById('content-segments-container');
    if (segmentsContainer) {
        new ContentSegmentsUI('content-segments-container');
    }
});
