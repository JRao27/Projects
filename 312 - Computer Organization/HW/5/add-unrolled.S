	.file	"add-unrolled.c"
	.text
	.p2align 4,,15
	.globl	add
	.type	add, @function
add:
.LFB0:
	.cfi_startproc
	movl	(%rsi), %eax
	movl	$1, %ecx
	movl	%eax, %r8d
	addl	(%rdi), %r8d
	jc	.L2
	xorl	%ecx, %ecx
	cmpl	%r8d, %eax
	seta	%cl
.L2:
	movl	%r8d, (%rdx)
	movl	4(%rdi), %r8d
	movl	4(%rsi), %r9d
	leal	(%r8,%r9), %eax
	addl	%eax, %ecx
	movl	$1, %eax
	cmpl	%ecx, %r8d
	ja	.L3
	xorl	%eax, %eax
	cmpl	%ecx, %r9d
	seta	%al
.L3:
	movl	%ecx, 4(%rdx)
	movl	8(%rdi), %r8d
	movl	8(%rsi), %r9d
	leal	(%r8,%r9), %ecx
	addl	%ecx, %eax
	movl	$1, %ecx
	cmpl	%eax, %r8d
	ja	.L4
	xorl	%ecx, %ecx
	cmpl	%eax, %r9d
	seta	%cl
.L4:
	movl	%eax, 8(%rdx)
	movl	12(%rdi), %r8d
	movl	12(%rsi), %r9d
	leal	(%r8,%r9), %eax
	addl	%eax, %ecx
	movl	$1, %eax
	cmpl	%ecx, %r8d
	ja	.L5
	xorl	%eax, %eax
	cmpl	%ecx, %r9d
	seta	%al
.L5:
	movl	%ecx, 12(%rdx)
	movl	16(%rdi), %r8d
	movl	16(%rsi), %r9d
	leal	(%r8,%r9), %ecx
	addl	%ecx, %eax
	movl	$1, %ecx
	cmpl	%eax, %r8d
	ja	.L6
	xorl	%ecx, %ecx
	cmpl	%eax, %r9d
	seta	%cl
.L6:
	movl	%eax, 16(%rdx)
	movl	20(%rdi), %r8d
	movl	20(%rsi), %r9d
	leal	(%r8,%r9), %eax
	addl	%eax, %ecx
	movl	$1, %eax
	cmpl	%ecx, %r8d
	ja	.L7
	xorl	%eax, %eax
	cmpl	%ecx, %r9d
	seta	%al
.L7:
	movl	%ecx, 20(%rdx)
	movl	24(%rdi), %r8d
	movl	24(%rsi), %r9d
	leal	(%r8,%r9), %ecx
	addl	%ecx, %eax
	movl	$1, %ecx
	cmpl	%eax, %r8d
	ja	.L8
	xorl	%ecx, %ecx
	cmpl	%eax, %r9d
	seta	%cl
.L8:
	movl	%eax, 24(%rdx)
	movl	28(%rdi), %r8d
	movl	28(%rsi), %r9d
	leal	(%r8,%r9), %eax
	addl	%eax, %ecx
	movl	$1, %eax
	cmpl	%ecx, %r8d
	ja	.L9
	xorl	%eax, %eax
	cmpl	%ecx, %r9d
	seta	%al
.L9:
	movl	%ecx, 28(%rdx)
	movl	32(%rdi), %r8d
	movl	32(%rsi), %r9d
	leal	(%r8,%r9), %ecx
	addl	%ecx, %eax
	movl	$1, %ecx
	cmpl	%eax, %r8d
	ja	.L10
	xorl	%ecx, %ecx
	cmpl	%eax, %r9d
	seta	%cl
.L10:
	movl	%eax, 32(%rdx)
	movl	36(%rdi), %edi
	movl	36(%rsi), %esi
	leal	(%rdi,%rsi), %eax
	addl	%eax, %ecx
	movl	$1, %eax
	cmpl	%ecx, %edi
	ja	.L11
	xorl	%eax, %eax
	cmpl	%ecx, %esi
	seta	%al
.L11:
	movl	%ecx, 36(%rdx)
	ret
	.cfi_endproc
.LFE0:
	.size	add, .-add
	.ident	"GCC: (GNU) 4.8.5 20150623 (Red Hat 4.8.5-11)"
	.section	.note.GNU-stack,"",@progbits